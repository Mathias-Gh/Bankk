from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from sqlmodel import Session, select
from config import Compte, Logs_transaction, Transaction, get_session
from datetime import datetime
import time

router = APIRouter()

def confirm_transaction(transaction: Transaction, transaction_log_id: int):
    from config import get_session

    time.sleep(10) 

    with next(get_session()) as db:
        transaction_log = db.exec(select(Logs_transaction).where(Logs_transaction.id == transaction_log_id)).first()
        if not transaction_log:
            return "Transaction non trouvée."

        if transaction_log.status == "canceled":
            return "Transaction annulée avant confirmation."

        from_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.from_iban_account)).first()
        to_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.to_iban_account)).first()

        if not from_iban or not to_iban:
            return "Compte source ou destinataire introuvable."

        from_iban.money_value -= transaction.amount
        to_iban.money_value += transaction.amount

        transaction_log.status = "completed"
        db.add(transaction_log)
        db.add(from_iban)
        db.add(to_iban)
        db.commit()

        return {
            "message": "Transaction effectuée avec succès après 10 secondes.",
            "from_iban_account": transaction.from_iban_account,
            "to_iban_account": transaction.to_iban_account,
            "amount": transaction.amount,
            "updated_from_balance": from_iban.money_value,
            "updated_to_balance": to_iban.money_value,
        }

@router.post("/transfer/")
async def transfer(transaction: Transaction, db: Session = Depends(get_session), background_tasks: BackgroundTasks = BackgroundTasks()):

    if transaction.amount is None or transaction.amount <= 0:
        raise HTTPException(status_code=400, detail="Montant invalide.")

    from_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.from_iban_account)).first()
    to_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.to_iban_account)).first()

    if from_iban.closed or to_iban.closed:
        raise HTTPException(status_code=400, detail="Un ou les deux comptes sont fermés.")

    if not from_iban or not to_iban:
        raise HTTPException(status_code=404, detail="Un ou les deux comptes n'ont pas été trouvés.")

    if transaction.from_iban_account == transaction.to_iban_account:
        raise HTTPException(status_code=400, detail="Vous ne pouvez pas effectuer de transaction entre le même compte.")

    if from_iban.money_value < transaction.amount:
        raise HTTPException(status_code=400, detail="Solde insuffisant dans le compte source.")

    new_log = Logs_transaction(
        from_log_transaction=transaction.from_iban_account,
        to_log_transaction=transaction.to_iban_account,
        logs_transaction_amount=transaction.amount,
        log_type="transaction",
        status="pending",
        created_at=datetime.utcnow(),
    )

    db.add(new_log)
    db.commit()

    background_tasks.add_task(confirm_transaction, transaction, new_log.id)

    return {
        "message": "La transaction est en attente de confirmation pendant 10 secondes.",
        "from_iban_account": transaction.from_iban_account,
        "to_iban_account": transaction.to_iban_account,
        "amount": transaction.amount,
    }

@router.post("/cancel_transaction/")
async def cancel_transaction(transaction_id: int, db: Session = Depends(get_session)):
    log = db.exec(select(Logs_transaction).where(Logs_transaction.id == transaction_id)).first()

    if log and log.status == "pending":
        log.status = "canceled"
        db.add(log)
        db.commit()
        return {"message": "Transaction annulée avec succès."}
    else:
        raise HTTPException(status_code=404, detail="Transaction non trouvée ou déjà traitée.")
