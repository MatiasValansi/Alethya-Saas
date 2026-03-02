import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. Definimos la URL (Usa variables de entorno para seguridad)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user_admin:secret_password@localhost:5432/alethya_db")

# 2. Creamos el Engine
engine = create_engine(DATABASE_URL)

# 3. Configuramos la sesión
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Clase base para los modelos (SaaS ready)
Base = declarative_base()

# 5. Dependencia para FastAPI (Inyección de dependencias)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()