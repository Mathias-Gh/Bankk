from sqlmodel import SQLModel, create_engine
from fastapi import FastAPI
from pydantic import EmailStr
from sqlmodel import SQLModel, Field
import hashlib
import random

DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, echo=True)

class User(SQLModel, table=True):
    email: EmailStr = Field(primary_key=True, unique=True)
    password: str = Field(..., min_length=8, max_length=64)
    iban: str = Field(unique=True)


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def generate_iban(country_code="FR") -> str:
    bank_code = f"{random.randint(10000, 99999)}"  
    branch_code = f"{random.randint(10000, 99999)}"  
    account_number = f"{random.randint(10000000000, 99999999999)}"  
    check_digits = f"{random.randint(10, 99)}" 

    return f"{country_code}{check_digits}{bank_code}{branch_code}{account_number}"

def init_db():
    SQLModel.metadata.create_all(engine)
