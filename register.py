from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import User, hash_password, generate_iban, get_session

router = APIRouter()

@router.post("/register", response_model=dict, status_code=201)
async def register_user(email: str, password: str, session: Session = Depends(get_session)):
    """
    Inscrire un utilisateur en générant un IBAN unique et en hachant le mot de passe.
    """

    existing_user = session.exec(select(User).where(User.email == email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="E-mail déjà utilisé.")

    iban = generate_iban()
    while session.exec(select(User).where(User.iban == iban)).first():
        iban = generate_iban()

    hashed_password = hash_password(password)

    new_user = User(email=email, password=hashed_password, iban=iban)
    session.add(new_user)
    session.commit()

    return {"message": "Utilisateur inscrit avec succès.", "email": email, "iban": iban}
