from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlmodel import SQLModel, Session, select
from config import User, Money, Compte, Transaction, get_session

router = APIRouter()

@router.post("/transfer/")  
async def transfer(transaction: Transaction, db: Session = Depends(get_session)):

    from_compte = db.exec(select(Compte).where(Compte.id == transaction.from_compte_id)).first()
    to_compte = db.exec(select(Compte).where(Compte.id == transaction.to_compte_id)).first()

    if not from_compte or not to_compte:
        raise HTTPException(status_code=404, detail="One or both accounts not found.")

    from_money = db.exec(select(Money).where(Money.id == from_compte.money_id)).first()
    to_money = db.exec(select(Money).where(Money.id == to_compte.money_id)).first()

    if not from_money or not to_money:
        raise HTTPException(status_code=404, detail="Money details not found for one or both accounts.")

    if from_money.value < transaction.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance in the source account.")

    from_money.value -= transaction.amount
    to_money.value += transaction.amount

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
