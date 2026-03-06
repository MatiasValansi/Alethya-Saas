from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 1. Importamos el middleware
from app.infrastructure.db.database import engine, Base
from app.infrastructure.db import models
from app.infrastructure.api.product_routes import router as product_router
from app.infrastructure.api import client_routes

# Creamos las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Alethya SaaS API")

# Definimos quiénes tienen permiso de entrar (Orígenes)
# Por ahora permitimos localhost donde correrá React (Vite)
origins = [
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

# Agregamos el middleware a la aplicación
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # Lista de URLs permitidas
    allow_credentials=True,     # Permite el envío de cookies/auth
    allow_methods=["*"],        # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],        # Permite todos los encabezados
)

app.include_router(product_router)
app.include_router(client_routes.router)

@app.get("/")
def read_root():
    return {
        "status": "Alethya API is running", 
        "version": "2.0-SaaS",
        "database": "Connected",
        "cors": "Enabled for Frontend"
    }