from sqlmodel import Session, create_engine, Field, SQLModel, select
from fastapi import FastAPI, Depends
from pydantic import BaseModel

app = FastAPI()

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
        
class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)

class CreateUser(BaseModel):
    name: str

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/users/")
def create_user(body: CreateUser, session = Depends(get_session)) -> User:
    user = User(name=body.name)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
@app.get("/users/")
def read_users(session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users

@app.get("/users/{user_id}")
def read_user(user_id: int, session = Depends(get_session)):
    user = session.get(User, user_id)
    return user