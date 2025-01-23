from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Compte, get_session

router = APIRouter()

@router.get("/account/{compte_id}", response_model=dict)
def get_account_balance(compte_id: int, session: Session = Depends(get_session)):
    try:
        compte = session.exec(select(Compte).where(Compte.id == compte_id)).first()

        if not compte:
            raise HTTPException(status_code=404, detail="Compte non trouvé")

        if compte.closed:  
            raise HTTPException(status_code=400, detail="Ce compte est clôturé et ne peut plus être consulté.")

        return {
            "compte_id": compte.id,
            "solde": compte.money_value,
            "iban": compte.iban_account
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
