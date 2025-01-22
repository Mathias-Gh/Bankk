from fastapi import FastAPI, HTTPException
from sqlmodel import Session, select
from typing import List
from config import User, hash_password, generate_iban, engine  


app = FastAPI()

# Route d'inscription
@app.post("/register", response_model=dict, status_code=201)
async def register_user(user: User):
    # Ouvrir une session de base de données
    with Session(engine) as session:
        # Vérification si l'email existe déjà
        statement = select(User).where(User.email == user.email)
        existing_user = session.exec(statement).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="E-mail déjà utilisé.")
        
        # Générer un IBAN unique
        iban = generate_iban()
        while session.exec(select(User).where(User.iban == iban)).first():
            iban = generate_iban()

        # Hacher le mot de passe
        hashed_password = hash_password(user.password)

        # Créer l'utilisateur
        new_user = User(email=user.email, password=hashed_password, iban=iban)
        session.add(new_user)
        session.commit()

    return {"message": "Utilisateur inscrit avec succès.", "email": user.email, "iban": iban}

# Route pour récupérer tous les utilisateurs inscrits (sans afficher les mots de passe)
@app.get("/users", response_model=List[dict])
async def get_users():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        return [{"email": user.email, "iban": user.iban} for user in users]

# Initialiser la base de données au démarrage de l'application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
