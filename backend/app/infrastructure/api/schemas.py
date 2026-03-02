from pydantic import BaseModel, Field
from uuid import UUID
from typing import Optional

# Lo que recibimos del Frontend
class ProductCreate(BaseModel):
    name: str = Field(..., example="Remera Oversize Blanca")
    description: Optional[str] = Field(None, example="Algodón 100% Premium")
    price: float = Field(..., gt=0, example=15000.0)
    stock: int = Field(..., ge=0, example=50)
    code: str = Field(..., example="REM-001")
    tenant_id: UUID # En un futuro esto vendrá del token de login

# Lo que devolvemos al Frontend
class ProductResponse(ProductCreate):
    id: UUID

    class Config:
        from_attributes = True # Permite a Pydantic leer objetos de SQLAlchemy