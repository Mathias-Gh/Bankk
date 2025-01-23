from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Compte, Logs, Logs_transaction, get_session
from datetime import datetime

router = APIRouter()

@router.post("/close_account/")
async def close_account(iban_account: str, db: Session = Depends(get_session)):

    account = db.exec(select(Compte).where(Compte.iban_account == iban_account)).first()

    if not account:
        raise HTTPException(status_code=404, detail="Compte non trouvé.")

    if account.closed:
        raise HTTPException(status_code=400, detail="Ce compte est déjà clôturé.")

    pending_transactions = db.exec(select(Logs_transaction).where(
        (Logs_transaction.from_log_transaction == iban_account) & 
        (Logs_transaction.status == "pending")
    )).all()
    if pending_transactions:
        raise HTTPException(status_code=400, detail="Le compte ne peut pas être clôturé tant qu'il y a des transactions en cours.")
    
    if account.first:
        raise HTTPException(status_code=400, detail="Le compte principal ne peut pas être clôturé.")
    
    principal_account = db.exec(select(Compte).where(Compte.first == True)).first()
    if not principal_account:
        raise HTTPException(status_code=404, detail="Aucun compte principal trouvé.")
    
    transferred_amount = account.money_value
    principal_account.money_value += transferred_amount
    account.money_value = 0  
    account.closed = True

    closure_log = Logs(
        logs_depot_user=account.user_id,
        logs_depot_amount=transferred_amount,
        created_at=datetime.utcnow(),
    )

    db.add(account)
    db.add(principal_account)
    db.add(closure_log)
    db.commit()
    db.refresh(account)
    db.refresh(principal_account)

    return {
        "message": "Le compte a été clôturé avec succès.",
        "iban_account": iban_account,
        "balance_transferred_to_principal": principal_account.money_value,
    }