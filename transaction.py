from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Session, create_engine, select
from config import User, Compte, Logs, Transaction, get_session

router = APIRouter()

@router.post("/transfer/")  
async def transfer(transaction: Transaction, db: Session = Depends(get_session)):

    if transaction.amount is None or transaction.amount <= 0:
        raise HTTPException(status_code=400, detail="no money bitch")


    from_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.from_iban_account)).first()
    to_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.to_iban_account)).first()

    if not from_iban or not to_iban:
        raise HTTPException(status_code=404, detail="One or both accounts not found.")

    from_money = db.exec(select(Compte).where(Compte.money_value == from_iban.money_value)).first()
    to_money = db.exec(select(Compte).where(Compte.money_value  == to_iban.money_value)).first()

    if transaction.from_iban_account == transaction.to_iban_account:
        raise HTTPException(status_code=404, detail="is same accout.")

    if not from_money or not to_money:
        raise HTTPException(status_code=404, detail="Money details not found for one or both accounts.")

    if from_money.money_value< transaction.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance in the source account.")
    

    from_money.money_value -= transaction.amount
    to_money.money_value += transaction.amount

    new_log = Logs(
        from_log_transaction=transaction.from_iban_account,
        to_log_transaction=transaction.to_iban_account,
        logs_transaction_amount=transaction.amount,
        log_type="transaction"
    )
    db.add(new_log)

    db.add(from_money)
    db.add(to_money)
    db.commit()

    return {
        "message": "Transaction completed successfully.",
        "from_iban_account": transaction.from_iban_account,
        "to_iban_account": transaction.to_iban_account,
        "amount": transaction.amount,
        "updated_from_balance": from_money.money_value,
        "updated_to_balance": to_money.money_value,
    }
