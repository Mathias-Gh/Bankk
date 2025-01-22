from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Compte, Depot, get_session

router = APIRouter()

@router.post("/depot", response_model=dict, status_code=201)

async def depot(depot: Depot, db: Session = Depends(get_session)):
    # Récupérer le compte destination
    to_compte = db.exec(select(Compte).where(Compte.user_id == depot.to_compte_id)).first()

    if not to_compte:
        raise HTTPException(status_code=404, detail="One account not found.")
    
    # Récupérer les soldes des comptes
    to_money = db.exec(select(Compte).where(Compte.money_value == to_compte.money_value)).first()
    
    # Effectuer le depot
    to_money.money_value += depot.amount

    # Sauvegarder les changements
    db.add(to_money)
    db.commit()

    return {
        "message": "Depot completed successfully.",
        "to_compte_id": depot.to_compte_id,
        "amount": depot.amount,
        "updated_to_balance": to_money.money_value,
    }