from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import User, Compte, get_session 

router = APIRouter()

@router.get("/listAccount/{user_id}", response_model=list)
def get_account_balance(user_id: int, session: Session = Depends(get_session)):
    try:

        comptes = session.exec(select(Compte).where(Compte.user_id == user_id)).all()

        if not comptes:
            raise HTTPException(status_code=404, detail="Aucun compte trouvé pour cet utilisateur")

        return [{"id_de_l_utilisateur": user_id, "solde": compte.money_value} for compte in comptes]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")