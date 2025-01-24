from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Beneficiary, BeneficiaryIBAN, Compte, User, validate_iban, get_session

# Créer un routeur pour gérer les bénéficiaires
router = APIRouter()

# ______________________________Ajouter un bénéficiaire_____________________________________

@router.post("/beneficiaire/")
async def add_beneficiary(
    user_id: int, 
    name: str, 
    iban: str, 
    session: Session = Depends(get_session)
):
    # Vérifier que l'utilisateur existe
    user = session.exec(select(User).where(User.id == user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    # Vérifier que l'utilisateur n'ajoute pas son propre IBAN
    own_account = session.exec(
        select(Compte).where(Compte.user_id == user_id, Compte.iban_account == iban)
    ).first()
    if own_account:
        raise HTTPException(
            status_code=400, detail="Vous ne pouvez pas ajouter votre propre IBAN comme bénéficiaire"
        )

    # Vérifier si un bénéficiaire avec le même nom existe déjà
    existing_beneficiary = session.exec(
        select(Beneficiary)
        .where(Beneficiary.user_id == user_id, Beneficiary.name == name)
    ).first()
    if existing_beneficiary:
        raise HTTPException(
            status_code=400, detail="Un bénéficiaire avec ce nom existe déjà"
        )
    
    # Vérifier que l'IBAN est valide
    if not validate_iban(iban):
        raise HTTPException(status_code=400, detail="IBAN non valide")

    # Ajouter un nouveau bénéficiaire
    beneficiary = Beneficiary(user_id=user_id, name=name)
    session.add(beneficiary)
    session.commit()
    session.refresh(beneficiary)

    # Vérifier que l'IBAN n'existe pas déjà pour ce bénéficiaire
    existing_iban = session.exec(
        select(BeneficiaryIBAN)
        .where(BeneficiaryIBAN.beneficiary_id == beneficiary.id, BeneficiaryIBAN.iban == iban)
    ).first()
    if existing_iban:
        raise HTTPException(
            status_code=400, detail="Cet IBAN est déjà enregistré pour ce bénéficiaire"
        )

    # Ajouter l'IBAN au bénéficiaire
    new_iban = BeneficiaryIBAN(beneficiary_id=beneficiary.id, iban=iban)
    session.add(new_iban)
    session.commit()
    session.refresh(new_iban)

    return {"message": "Bénéficiaire et IBAN ajoutés avec succès", "beneficiary": beneficiary, "iban": new_iban}

# ______________________________Ajouter un IBAN à un bénéficiaire_____________________________________

@router.post("/beneficiaire/{beneficiary_id}/iban/")
async def add_iban_to_beneficiary(
    beneficiary_id: int, 
    iban: str, 
    session: Session = Depends(get_session)
):
    # Vérifier que le bénéficiaire existe
    beneficiary = session.exec(select(Beneficiary).where(Beneficiary.id == beneficiary_id)).first()
    if not beneficiary:
        raise HTTPException(status_code=404, detail="Bénéficiaire introuvable")

    # Vérifier que l'utilisateur n'ajoute pas son propre IBAN
    user = session.exec(select(User).where(User.id == beneficiary.user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    # Vérifier si l'IBAN appartient à l'utilisateur (et non au bénéficiaire)
    own_account = session.exec(
        select(Compte).where(Compte.user_id == user.id, Compte.iban_account == iban)
    ).first()

    if own_account:
        raise HTTPException(
            status_code=400, detail="Vous ne pouvez pas ajouter votre propre IBAN pour ce bénéficiaire"
        )

    # Vérifier que l'IBAN est valide
    if not validate_iban(iban):
        raise HTTPException(status_code=400, detail="IBAN non valide")

    # Vérifier que l'IBAN n'existe pas déjà pour ce bénéficiaire
    existing_iban = session.exec(
        select(BeneficiaryIBAN)
        .where(BeneficiaryIBAN.beneficiary_id == beneficiary.id, BeneficiaryIBAN.iban == iban)
    ).first()
    if existing_iban:
        raise HTTPException(status_code=400, detail="Cet IBAN est déjà enregistré pour ce bénéficiaire")

    # Ajouter l'IBAN au bénéficiaire
    new_iban = BeneficiaryIBAN(beneficiary_id=beneficiary.id, iban=iban)
    session.add(new_iban)
    session.commit()
    session.refresh(new_iban)

    return {"message": "IBAN ajouté avec succès", "iban": new_iban}

# ______________________________Afficher les bénéficiaires_____________________________________
@router.get("/beneficiaire/{user_id}")
async def get_beneficiaries(user_id: int, session: Session = Depends(get_session)):
    # Récupérer tous les bénéficiaires de l'utilisateur
    beneficiaries = session.exec(
        select(Beneficiary)
        .where(Beneficiary.user_id == user_id)
    ).all()

    if not beneficiaries:
        raise HTTPException(status_code=404, detail="Aucun bénéficiaire trouvé pour cet utilisateur")

    # Préparer la réponse avec les IBANs
    result = []
    for beneficiary in beneficiaries:
        # Récupérer les IBANs associés au bénéficiaire
        ibans = session.exec(
            select(BeneficiaryIBAN).where(BeneficiaryIBAN.beneficiary_id == beneficiary.id)
        ).all()

        result.append({
            "id": beneficiary.id,
            "name": beneficiary.name,
            "added_date": beneficiary.added_date.isoformat(),  # Format ISO 8601 pour added_date
            "ibans": [{"id": iban.id, "iban": iban.iban, "added_date": iban.added_date.isoformat()} for iban in ibans],
        })

    return {"beneficiaries": result}