from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Compte, CreateAccountRequest, get_session
from utils import generate_iban

router = APIRouter()

@router.post("/openAccount", response_model=dict, status_code=201)
async def openAccount(compte: CreateAccountRequest, session: Session = Depends(get_session)):

    # Vérification si l'utilisateur a déjà des comptes
    existing_accounts = session.exec(select(Compte).where(Compte.user_id == compte.user_id)).all()

    # Si c'est le premier compte, donner le nom "Compte principal" et initialiser money_value à 100
    if not existing_accounts:
        account_name = "Compte principal"
        money_value = 100.0  # Valeur par défaut pour le premier compte
    else:
        # Sinon, utiliser le nom fourni par l'utilisateur, ou "Compte sans nom" par défaut
        account_name = compte.account_name if compte.account_name else "Compte sans nom"
        money_value = 0.0  # Valeur par défaut pour les autres comptes

    # Génération d'un IBAN unique
    iban_account = generate_iban()
    while session.exec(select(Compte).where(Compte.iban_account == iban_account)).first():
        iban_account = generate_iban()

    # Création du compte avec le nom choisi et la valeur d'argent
    new_account = Compte(
        user_id=compte.user_id,
        money_value=money_value,  # Valeur assignée ici
        iban_account=iban_account,
        account_name=account_name
    )

    # Ajout du compte dans la base de données
    session.add(new_account)
    session.commit()
    session.refresh(new_account)

    return {"message": "Compte ouvert avec succès."}