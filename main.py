from fastapi import FastAPI
from config import engine
from sqlmodel import SQLModel
from register import router as register_route
from transaction import router as transaction_route

app = FastAPI()

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(register_route, prefix="/api", tags=["Register"])
app.include_router(transaction_route, prefix="/api", tags=["Transaction"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(router, host="0.0.0.0", port=8000)