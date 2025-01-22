from fastapi import APIRouter
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Session, select
from config import User, Money, Compte, get_session

router = APIRouter()

@router.post("/users/{user_id}/compte", response_model=dict, status_code=201)
async def create_user_compte(user_id: id session: Session = Depends(get_session)):
    
    user = session.exec(select(User).where(User.id == compte.id)).first()

    new_money = Money(value=0.0)
        session.add(new_money)
        session.commit()
        session.refresh(new_money)

    return {"": new_user.email, "iban": new_user.iban}

