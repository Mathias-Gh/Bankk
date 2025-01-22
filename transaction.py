from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Session, create_engine, select

# Configuration de la base de données
DATABASE_URL =  "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Modèles de la base de données
class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True, nullable=False)
    password: str
    iban: str = Field(unique=True, nullable=False)

class Money(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    value: float

class Compte(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    money_id: int = Field(foreign_key="money.id")

# FastAPI app
app = FastAPI()

# Dépendance pour obtenir une session de base de données
def get_db():
    with Session(engin) as session:
        yield session

# Modèle pour représenter une transaction
class Transaction(BaseModel):
    from_compte_id: int
    to_compte_id: int
    amount: float

@app.post("/transfer/")  
async def transfer(transaction: Transaction, db: Session = Depends(get_db)):
    # Récupérer les comptes source et destination
    from_compte = db.exec(select(Compte).where(Compte.id == transaction.from_compte_id)).first()
    to_compte = db.exec(select(Compte).where(Compte.id == transaction.to_compte_id)).first()

    if not from_compte or not to_compte:
        raise HTTPException(status_code=404, detail="One or both accounts not found.")

    # Récupérer les soldes des comptes
    from_money = db.exec(select(Money).where(Money.id == from_compte.money_id)).first()
    to_money = db.exec(select(Money).where(Money.id == to_compte.money_id)).first()

    if not from_money or not to_money:
        raise HTTPException(status_code=404, detail="Money details not found for one or both accounts.")

    # Vérifier le solde suffisant
    if from_money.value < transaction.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance in the source account.")

    # Effectuer la transaction
    from_money.value -= transaction.amount
    to_money.value += transaction.amount

    # Sauvegarder les changements
    db.add(from_money)
    db.add(to_money)
    db.commit()

    return {
        "message": "Transaction completed successfully.",
        "from_compte_id": transaction.from_compte_id,
        "to_compte_id": transaction.to_compte_id,
        "amount": transaction.amount,
        "updated_from_balance": from_money.value,
        "updated_to_balance": to_money.value,
    }
