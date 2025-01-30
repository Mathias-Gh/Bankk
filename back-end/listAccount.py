from fastapi import APIRouter, HTTPException, Depends, Cookie
from sqlmodel import Session, select
from config import User, Compte, get_session 
from utils import decode_jwt


router = APIRouter()

@router.get("/listAccount", response_model=list)
def get_account_balance(
    access_token: str = Cookie(None),  # Récupérer le token depuis le cookie
    session: Session = Depends(get_session)
):
    if not access_token:
        raise HTTPException(status_code=401, detail="Token manquant")

    # Vérifier et décoder le token JWT
    payload = decode_jwt(access_token)
    user_id = payload.get("user_id")

    # Récupérer les comptes de l'utilisateur
    comptes = session.exec(select(Compte).where(Compte.user_id == user_id)).all()
    if not comptes:
        raise HTTPException(status_code=404, detail="Aucun compte trouvé pour cet utilisateur")

    return [{"id_de_l_utilisateur": user_id, "iban": compte.iban, "Date": compte.datecreated} for compte in comptes]