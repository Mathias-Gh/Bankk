from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Les tableaux simulant des comptes avec des soldes
user1 = [1000, 500, 300]  
user2 = [200, 800, 400]   

# Modèle pour représenter une transaction
class Transaction(BaseModel):
    from_table: str  
    to_table: str    
    from_index: int
    to_index: int
    amount: float

@app.post("/transfer/")
async def transfer(transaction: Transaction):
    # Vérification des tableaux
    if transaction.from_table not in ["user1", "user2"] or transaction.to_table not in ["user1", "user2"]:
        raise HTTPException(status_code=400, detail="Invalid table name. Use 'accounts1' or 'accounts2'.")
    
    # Accès dynamique aux tableaux
    from_table = globals()[transaction.from_table]
    to_table = globals()[transaction.to_table]

    # Vérification des indices
    if transaction.from_index >= len(from_table) or transaction.to_index >= len(to_table):
        raise HTTPException(status_code=400, detail="Invalid indices for the arrays.")
    
    # Vérification du solde suffisant
    if from_table[transaction.from_index] < transaction.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance in the source account.")
    
    # Effectuer la transaction
    from_table[transaction.from_index] -= transaction.amount
    to_table[transaction.to_index] += transaction.amount

    return {
        "message": "Transaction completed successfully.",
        "from_table": transaction.from_table,
        "to_table": transaction.to_table,
        "from_index": transaction.from_index,
        "to_index": transaction.to_index,
        "amount": transaction.amount,
        "updated_accounts1": accounts1,
        "updated_accounts2": accounts2,
    }