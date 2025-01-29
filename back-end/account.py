from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Compte, User, get_session

router = APIRouter()

@router.get("/account/{user_id}/{compte_id}", response_model=dict)
def get_account_balance(compte_id: int, token: str, session: Session = Depends(get_session)):
    try:
        compte = session.exec(select(Compte).where(Compte.id == compte_id)).first()

        if not compte:
            raise HTTPException(status_code=404, detail="Compte non trouvé")

        user = session.exec(select(User).where(User.id == user_id)).first()
        if not user:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

        if compte.user_id != user.id:
            raise HTTPException(status_code=403, detail="Accès interdit : ce compte n'appartient pas à cet utilisateur")

        if compte.closed:
            raise HTTPException(status_code=400, detail="Ce compte est clôturé et ne peut plus être consulté.")

        return {
            "compte_id": compte.id,
            "solde": compte.money_value,
            "iban": compte.iban_account
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
