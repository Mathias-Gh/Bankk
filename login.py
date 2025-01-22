from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import User, get_session, hash_password
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    iban: str
    password: str

@router.post("/login", response_model=dict)
def login_user(credentials: LoginRequest, session: Session = Depends(get_session)):

    user = session.exec(select(User).where(User.iban == credentials.iban)).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    if user.password != hash_password(credentials.password):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")

    return {
        "message": "Connexion réussie",
        "email": user.email,
        "iban": user.iban
    }