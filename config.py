from sqlmodel import SQLModel, Field, create_engine, Session, select
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
import hashlib
import random

DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, echo=True)

app = FastAPI()

class User(SQLModel, table=True):
    email: EmailStr = Field(primary_key=True, unique=True)
    password: str
    iban: str = Field(unique=True)

class UserCreate(BaseModel):
    email: EmailStr
    password: str

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_iban(country_code="FR") -> str:
    bank_code = f"{random.randint(10000, 99999)}"
    branch_code = f"{random.randint(10000, 99999)}"
    account_number = f"{random.randint(10000000000, 99999999999)}"
    check_digits = f"{random.randint(10, 99)}"

    return f"{country_code}{check_digits}{bank_code}{branch_code}{account_number}"

@app.on_event("startup")
def on_startup():
    init_db()

@app.post("/users/", response_model=dict)
def create_user(user: UserCreate, session: Session = Depends(get_session)):

    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="E-mail déjà utilisé.")

    iban = generate_iban()
    while session.exec(select(User).where(User.iban == iban)).first():
        iban = generate_iban()

    hashed_password = hash_password(user.password)

    new_user = User(email=user.email, password=hashed_password, iban=iban)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {"email": new_user.email, "iban": new_user.iban}

@app.get("/users/")
def get_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return [{"email": user.email, "iban": user.iban} for user in users]