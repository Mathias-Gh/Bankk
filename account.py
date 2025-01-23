# account.py
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Compte, get_session  # Assurez-vous d'importer le modèle Compte

router = APIRouter()

@router.get("/account/{compte_id}", response_model=dict)
def get_account_balance(compte_id: int, session: Session = Depends(get_session)):
    try:
        # Récupérer le compte à partir de l'ID
        compte = session.exec(select(Compte).where(Compte.id == compte_id)).first()

        # Vérifier si le compte existe
        if not compte:
            raise HTTPException(status_code=404, detail="Compte non trouvé")

        # Retourner le solde du compte
        return {"compte_id": compte.id, "solde": compte.money_value}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")