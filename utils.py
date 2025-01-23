from sqlmodel import Session
from datetime import datetime, timedelta
import jwt
import hashlib
import random

SECRET_KEY = "your_secret_key"  # À remplacer par une clé secrète plus robuste
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Créer un token JWT."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_iban(country_code="FR") -> str:
    bank_code = f"{random.randint(10000, 99999)}"
    branch_code = f"{random.randint(10000, 99999)}"
    account_number = f"{random.randint(10000000000, 99999999999)}"
    check_digits = f"{random.randint(10, 99)}"
    return f"{country_code}{check_digits}{bank_code}{branch_code}{account_number}"

def get_session():
    with Session(engine) as session:
        yield session