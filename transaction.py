from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from sqlmodel import Session, select
from config import Compte, Logs, Transaction, get_session
from datetime import datetime
import time

router = APIRouter()

# Fonction qui effectue la transaction après un délai de 10 secondes
def confirm_transaction(transaction, db: Session, transaction_log_id):
    time.sleep(10)  # Simulation de 10 secondes d'attente

    # Récupérer à nouveau les objets log et les comptes depuis la base de données
    transaction_log = db.exec(select(Logs).where(Logs.id == transaction_log_id)).first()
    if not transaction_log:
        return "Transaction non trouvée."

    # Si la transaction a été annulée avant la confirmation
    if transaction_log.status == "canceled":
        return "Transaction annulée avant confirmation."

    # Récupérer à nouveau les comptes pour les mettre à jour
    from_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.from_iban_account)).first()
    to_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.to_iban_account)).first()

    if not from_iban or not to_iban:
        return "Compte source ou destinataire introuvable."

    # Effectuer la transaction si elle est toujours en attente
    if transaction_log.status == "pending":
        from_iban.money_value -= transaction.amount
        to_iban.money_value += transaction.amount

        # Mise à jour du statut de la transaction
        transaction_log.status = "completed"
        
        # Ajout des nouvelles valeurs dans la session
        db.add(from_iban)
        db.add(to_iban)
        db.add(transaction_log)
        
        db.commit()  # Sauvegarde les changements
        db.refresh(from_iban)  # Rafraîchir les objets
        db.refresh(to_iban)  # Rafraîchir les objets

        return {
            "message": "Transaction effectuée avec succès après 10 secondes.",
            "from_iban_account": transaction.from_iban_account,
            "to_iban_account": transaction.to_iban_account,
            "amount": transaction.amount,
            "updated_from_balance": from_iban.money_value,
            "updated_to_balance": to_iban.money_value,
        }

    return "Erreur lors de la confirmation de la transaction."


# Route de transfert
@router.post("/transfer/")
async def transfer(transaction: Transaction, db: Session = Depends(get_session), background_tasks: BackgroundTasks = BackgroundTasks()):

    if transaction.amount is None or transaction.amount <= 0:
        raise HTTPException(status_code=400, detail="Montant invalide.")

    from_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.from_iban_account)).first()
    to_iban = db.exec(select(Compte).where(Compte.iban_account == transaction.to_iban_account)).first()

    if not from_iban or not to_iban:
        raise HTTPException(status_code=404, detail="Un ou les deux comptes n'ont pas été trouvés.")

    if transaction.from_iban_account == transaction.to_iban_account:
        raise HTTPException(status_code=400, detail="Vous ne pouvez pas effectuer de transaction entre le même compte.")

    if from_iban.money_value < transaction.amount:
        raise HTTPException(status_code=400, detail="Solde insuffisant dans le compte source.")

    # Créer un log de la transaction en attente
    new_log = Logs(
        from_log_transaction=transaction.from_iban_account,
        to_log_transaction=transaction.to_iban_account,
        logs_transaction_amount=transaction.amount,
        log_type="transaction",
        status="pending",  # La transaction est en attente
        created_at=datetime.utcnow(),
    )

    db.add(new_log)
    db.commit()

    # Démarrer la tâche en arrière-plan pour confirmer la transaction après 10 secondes
    background_tasks.add_task(confirm_transaction, transaction, db, new_log.id)

    return {
        "message": "La transaction est en attente de confirmation pendant 10 secondes.",
        "from_iban_account": transaction.from_iban_account,
        "to_iban_account": transaction.to_iban_account,
        "amount": transaction.amount,
    }

# Route pour annuler une transaction
@router.post("/cancel_transaction/")
async def cancel_transaction(transaction_id: int, db: Session = Depends(get_session)):
    log = db.exec(select(Logs).where(Logs.id == transaction_id)).first()

    if log and log.status == "pending":
        log.status = "canceled"
        db.add(log)
        db.commit()
        return {"message": "Transaction annulée avec succès."}
    else:
        raise HTTPException(status_code=404, detail="Transaction non trouvée ou déjà traitée.")
