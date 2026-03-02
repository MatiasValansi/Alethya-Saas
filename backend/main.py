from fastapi import FastAPI
from backend.app.infrastructure.db.database import engine, Base
from backend.app.infrastructure.db import models  # Importante para que SQLAlquemy vea los modelos

# Esta línea crea las tablas en la base de datos si no existen
# Es el equivalente al 'update' de Hibernate en Java
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Alethya SaaS API")

@app.get("/")
def read_root():
    return {
        "status": "Alethya API is running", 
        "version": "2.0-SaaS",
        "database": "Connected and Tables Created"
    }