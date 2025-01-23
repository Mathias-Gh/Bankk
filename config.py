from sqlmodel import SQLModel, Field, create_engine, Session, select
from fastapi import FastAPI, HTTPException, Depends
from pydantic import EmailStr, BaseModel

DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, echo=True)

app = FastAPI()

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)  
    email: EmailStr = Field(unique=True)  
    password: str
    # activated: bool = Field(default=False)

class UserCreate(SQLModel):  
    email: EmailStr
    password: str
    # created_at: str

class Compte(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    iban_account: str = Field(unique=True)
    money_value: float | None = Field(default=None)
    first: bool = Field(default=False)

class Logs(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)

    from_log_transaction: str | None = Field(default=None)
    to_log_transaction: str | None = Field(default=None)
    logs_transaction_amount: float | None = Field(default=None)

    logs_depot_user: int | None = Field(default=None)
    logs_depot_amount: float | None = Field(default=None)
    log_type: str 

    # logs_create_user: str 

    # logs_account_id: str


class Transaction(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    from_iban_account: str
    to_iban_account: str
    amount: float

class Depot(SQLModel):
    to_account_id: int
    amount: float

class LoginRequest(BaseModel):
    email: str
    password: str
    # connected: bool = Field(foreign_key="user.activated")

class CreateAccountRequest(SQLModel):
    user_id: int
    iban_account: str
    money_value: float

class AccountRequest(SQLModel):
    user_id: int

def init_db():
    SQLModel.metadata.create_all(engine)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/users/")
def get_users(session: Session = Depends(get_session)):
    try:
        users = session.exec(select(User)).all()
        return [{"email": user.email, "iban": user.iban} for user in users]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")