from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Compte, Depot, Logs, get_session
from datetime import datetime

router = APIRouter()

@router.post("/depot", response_model=dict, status_code=201)
async def depot(depot: Depot, db: Session = Depends(get_session)):

    to_account = db.exec(select(Compte).where(Compte.id == depot.to_account_id)).first()

    if not to_account:
        raise HTTPException(status_code=404, detail="Account not found.")

    to_account.money_value += depot.amount

    new_log = Logs(
        logs_depot_user=depot.to_account_id,
        logs_depot_amount=depot.amount,
        created_at=datetime.utcnow(),
    )

    try:
        db.add(new_log)
        db.add(to_account)
        db.commit()
        db.refresh(to_account)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error processing deposit: {str(e)}")

    return {
        "message": "Depot completed successfully.",
        "to_account_id": depot.to_account_id,
        "amount": depot.amount,
        "updated_to_balance": to_account.money_value,
    }