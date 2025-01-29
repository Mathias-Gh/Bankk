from sqlmodel import SQLModel, Field, create_engine, Session, select
from fastapi import FastAPI, HTTPException, Depends
from pydantic import EmailStr, BaseModel
import re
from datetime import datetime
from zoneinfo import ZoneInfo

DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, echo=True)

app = FastAPI()

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)  
    email: str = Field(unique=True)  
    password: str = Field(min_length=8)

class UserCreate(SQLModel): 

    email: str
    password: str 
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Compte(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    iban_account: str = Field(unique=True)
    money_value: float | None = Field(default=None)
    first: bool = Field(default=False)
    closed: bool = Field(default=False)
    datecreated : datetime = Field(default_factory=lambda: datetime.now(ZoneInfo("Europe/Paris")))

class Beneficiary(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    name: str  # Le nom du bénéficiaire
    added_date: datetime = Field(default_factory=datetime.utcnow)

class BeneficiaryIBAN(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    beneficiary_id: int = Field(foreign_key="beneficiary.id")  # Lié à un bénéficiaire
    iban: str = Field(unique=True)  # IBAN unique
    added_date: datetime = Field(default_factory=datetime.utcnow)  # Date d'ajout

class Logs(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    logs_depot_user: int | None = Field(default=None)
    logs_depot_amount: float | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(ZoneInfo("Europe/Paris")))

class Logs_transaction(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    from_log_transaction: str
    to_log_transaction: str
    logs_transaction_amount: float
    log_type: str  
    status: str  
    created_at: datetime = Field(default_factory=lambda: datetime.now(ZoneInfo("Europe/Paris")))

class Transaction(SQLModel):
    from_iban_account: str
    to_iban_account: str
    amount: float

class Depot(SQLModel):
    to_account_id: int
    amount: float

class LoginRequest(BaseModel):
    email: str
    password: str

class CreateAccountRequest(SQLModel):
    user_id: int
    iban_account: str
    money_value: float

class AccountRequest(SQLModel):
    user_id: int

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session


def validate_iban(iban: str) -> bool:
    """Valide un IBAN en vérifiant qu'il respecte le format standard."""
    # Expression régulière pour valider l'IBAN (format standard)
    iban_regex = re.compile(r'^[A-Z]{2}[0-9]{2}[A-Z0-9]{4,30}$')
    return bool(iban_regex.match(iban))

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/users/")
def get_users(session: Session = Depends(get_session)):
    try:
        users = session.exec(select(User)).all()
        return [{"email": user.email, "iban": user.iban} for user in users]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")