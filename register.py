from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import User, get_session, UserCreate
from utils import generate_iban, hash_password
router = APIRouter()

@router.post("/users/", response_model=dict)
async def create_user(user: UserCreate, session: Session = Depends(get_session)):
    try:
        # Vérifier si l'utilisateur existe déjà
        existing_user = session.exec(select(User).where(User.email == user.email)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="E-mail déjà utilisé.")

        # Générer un IBAN unique
        iban = generate_iban()
        while session.exec(select(User).where(User.iban == iban)).first():
            iban = generate_iban()

        # Hacher le mot de passe
        hashed_password = hash_password(user.password)
    
        # Créer et sauvegarder le nouvel utilisateur
        new_user = User(email=user.email, password=hashed_password, iban=iban)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        return {"email": new_user.email, "iban": new_user.iban}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
