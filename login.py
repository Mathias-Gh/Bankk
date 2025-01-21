from config import User
from fastapi import APIRouter, HTTPException


router = APIRouter()

@router.post("/login")