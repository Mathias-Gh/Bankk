from datetime import datetime, timedelta
import jwt
import hashlib
import random
from passlib.context import CryptContext
from fastapi import HTTPException 

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

def decode_jwt(token: str):
    """ Fonction pour décoder le token JWT """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Créer un token JWT."""
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    print(f"Generated token: {encoded_jwt}")  # Ajoutez cette ligne pour déboguer
    return encoded_jwt

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_iban(country_code="FR") -> str:
    bank_code = f"{random.randint(10000, 99999)}"
    branch_code = f"{random.randint(10000, 99999)}"
    account_number = f"{random.randint(10000000000, 99999999999)}"
    check_digits = f"{random.randint(10, 99)}"
    return f"{country_code}{check_digits}{bank_code}{branch_code}{account_number}"