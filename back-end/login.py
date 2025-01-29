from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import User, get_session, LoginRequest
from utils import hash_password, create_access_token


router = APIRouter()

@router.get("/login", response_model=dict)
def login_user(credentials: LoginRequest, session: Session = Depends(get_session)):

    user = session.exec(select(User).where(User.email == credentials.email)).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    if user.password != hash_password(credentials.password):
        raise HTTPException(status_code=403, detail="Mot de passe incorrect")
    
    if user.token:
        access_token = user.token
    else:
        access_token = create_access_token(data={"sub": user.email})
        user.token = access_token
        session.commit()
        session.refresh(user)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "message": "Connexion réussie",
        "email": user.email,
    }