from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from typing import List
from config import User, hash_password, generate_iban, engine  

router = APIRouter()

@router.post("/register", response_model=dict, status_code=201)
async def register_user(user: User):

    with Session(engine) as session:

        statement = select(User).where(User.email == user.email)
        existing_user = session.exec(statement).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="E-mail déjà utilisé.")
        
        iban = generate_iban()
        while session.exec(select(User).where(User.iban == iban)).first():
            iban = generate_iban()

        hashed_password = hash_password(user.password)

        new_user = User(email=user.email, password=hashed_password, iban=iban)
        session.add(new_user)
        session.commit()

    return {"message": "Utilisateur inscrit avec succès.", "email": user.email, "iban": iban}


@router.get("/users", response_model=List[dict])
async def get_users():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        return [{"email": user.email, "iban": user.iban} for user in users]

