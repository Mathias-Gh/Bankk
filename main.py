from fastapi import FastAPI
from config import engine
from sqlmodel import SQLModel
from register import router as register_route
from transaction import router as transaction_route
from depot import router as depot_route
from login import router as login_route
from openAccount import router as openAccount_route
from account import router as account_route
from listAccount import router as listAccount_route
from listTransaction import router as listTransaction_route
from close_account import router as close_account_route


app = FastAPI()

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(register_route, prefix="/api", tags=["Register"])
app.include_router(transaction_route, prefix="/api", tags=["Transaction"])
app.include_router(login_route, prefix="/api", tags=["Login"])
app.include_router(depot_route, prefix="/api", tags=["depot"])
app.include_router(openAccount_route, prefix="/api", tags=["openAccount"])
app.include_router(account_route, prefix="/api", tags=["account"])
app.include_router(listAccount_route, prefix="/api", tags=["listAccount"])
app.include_router(close_account_route, prefix="/api", tags=["Close_Account"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
