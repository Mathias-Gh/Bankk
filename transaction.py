from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Session, create_engine, select
from config import User, Compte, Transaction, get_session

router = APIRouter()

@router.post("/transfer/")  
async def transfer(transaction: Transaction, db: Session = Depends(get_session)):
    # Récupérer les comptes source et destination
    from_compte = db.exec(select(Compte).where(Compte.id == transaction.from_compte_id)).first()
    to_compte = db.exec(select(Compte).where(Compte.id == transaction.to_compte_id)).first()

    if not from_compte or not to_compte:
        raise HTTPException(status_code=404, detail="One or both accounts not found.")

    # Récupérer les soldes des comptes
    from_money = db.exec(select(Compte).where(Compte.money_value == from_compte.money_value)).first()
    to_money = db.exec(select(Compte).where(Compte.money_value  == to_compte.money_value)).first()

    if not from_money or not to_money:
        raise HTTPException(status_code=404, detail="Money details not found for one or both accounts.")

    # Vérifier le solde suffisant
    if from_money.money_value< transaction.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance in the source account.")

    # Effectuer la transaction
    from_money.money_value -= transaction.amount
    to_money.money_value += transaction.amount

    # Sauvegarder les changements
    db.add(from_money)
    db.add(to_money)
    db.commit()

    return {
        "message": "Transaction completed successfully.",
        "from_compte_id": transaction.from_compte_id,
        "to_compte_id": transaction.to_compte_id,
        "amount": transaction.amount,
        "updated_from_balance": from_money.money_value,
        "updated_to_balance": to_money.money_value,
    }
