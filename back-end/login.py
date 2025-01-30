from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from config import User, get_session, LoginRequest
from utils import hash_password, create_access_token
from datetime import timedelta


router = APIRouter()

@router.post("/login", response_model=dict)
def login(credentials: LoginRequest, session: Session = Depends(get_session)):


    user = session.exec(select(User).where(User.email == credentials.email)).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    if user.password != hash_password(credentials.password):
        raise HTTPException(status_code=403, detail="Mot de passe incorrect")

    access_token = create_access_token(data={"sub": user.email})

    # Créer une réponse avec un cookie contenant le JWT
    response = JSONResponse(content={"message": "Connecté avec succès"})
    response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=timedelta(hours=1))


    return response
