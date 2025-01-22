from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


user1 = [1000, 500, 300]  
user2 = [200, 800, 400]   


class Transaction(BaseModel):
    from_table: str  
    to_table: str    
    from_index: int
    to_index: int
    amount: float

@router.post("/transfer/")
async def transfer(transaction: Transaction):

    if transaction.from_table not in ["user1", "user2"] or transaction.to_table not in ["user1", "user2"]:
        raise HTTPException(status_code=400, detail="Invalid table name. Use 'accounts1' or 'accounts2'.")
    
    from_table = globals()[transaction.from_table]
    to_table = globals()[transaction.to_table]

    if transaction.from_index >= len(from_table) or transaction.to_index >= len(to_table):
        raise HTTPException(status_code=400, detail="Invalid indices for the arrays.")
    
    if from_table[transaction.from_index] < transaction.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance in the source account.")
    
    from_table[transaction.from_index] -= transaction.amount
    to_table[transaction.to_index] += transaction.amount

    return {
        "message": "Transaction completed successfully.",
        "from_table": transaction.from_table,
        "to_table": transaction.to_table,
        "from_index": transaction.from_index,
        "to_index": transaction.to_index,
        "amount": transaction.amount,
        "updated_accounts1": user1,
        "updated_accounts2": user2,
    }