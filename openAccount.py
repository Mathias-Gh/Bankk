from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from config import Compte, CreateAccountRequest, get_session
router = APIRouter()
@router.post("/openAccount", response_model=dict, status_code=201)
async def openAccount(compte: CreateAccountRequest, session: Session = Depends(get_session)):

    new_account = Compte(user_id= compte.user_id, money_value = compte.money_value) 
    session.add(new_account)
    session.commit()
    session.refresh(new_account)
    return {"message": "Compte ouvert avec succès."}