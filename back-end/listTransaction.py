from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Logs_transaction, Compte, get_session

router = APIRouter()

@router.get("/listTransaction/{iban_account}", response_model=list)
async def get_account_transactions(iban_account: str, session: Session = Depends(get_session)):
    try:

        account = session.exec(select(Compte).where(Compte.iban_account == iban_account)).first()
        if not account:
            raise HTTPException(status_code=404, detail="IBAN introuvable.")


        from_logs = session.exec(select(Logs_transaction).where(Logs_transaction.from_log_transaction == iban_account)).all()
        to_logs = session.exec(select(Logs_transaction).where(Logs_transaction.to_log_transaction == iban_account)).all()


        all_logs = from_logs + to_logs


        if not all_logs:
            raise HTTPException(status_code=404, detail="Aucune transaction trouvée pour cet IBAN.")


        sorted_logs = sorted(all_logs, key=lambda log: log.logs_transaction_amount, reverse=True)


        return [
            {
                "transaction_id": log.id,
                "from": log.from_log_transaction,
                "type": log.log_type,
                "status": log.status,
            }
            for log in sorted_logs
        ]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/transaction/{iban_account}/{log_id}", response_model=dict)
def get_transaction_details(log_id: int, iban_account: str, session: Session = Depends(get_session)):
    try:
        account = session.exec(select(Compte).where(Compte.iban_account == iban_account)).first()
        if not account:
            raise HTTPException(status_code=404, detail="IBAN introuvable.")

        transaction = session.exec(select(Logs_transaction).where(Logs_transaction.id == log_id)).first()
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction introuvable.")

        if transaction.from_log_transaction != iban_account and transaction.to_log_transaction != iban_account:
            raise HTTPException(status_code=403, detail="Cet IBAN n'est pas impliqué dans cette transaction.")


        return {
            "transaction_id": transaction.id,
            "from": transaction.from_log_transaction,
            "to": transaction.to_log_transaction,
            "amount": transaction.logs_transaction_amount,
            "type": transaction.log_type,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
