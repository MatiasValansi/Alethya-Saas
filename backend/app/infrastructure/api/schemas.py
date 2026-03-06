from pydantic import BaseModel, Field, EmailStr
from uuid import UUID
from typing import Optional


class ProductBase(BaseModel):
    name: str = Field(..., example="Remera Oversize Blanca")
    description: Optional[str] = Field(None, example="Algodón 100% Premium")
    price: float = Field(..., gt=0, example=15000.0)
    stock: int = Field(..., ge=0, example=50)
    code: str = Field(..., example="REM-001")
    tenant_id: UUID

class ProductCreate(ProductBase):
    pass 

class ProductResponse(ProductBase):
    id: UUID
    class Config:
        from_attributes = True


class ClientBase(BaseModel):
    name: str = Field(..., min_length=2, example="Juan Pérez")
    dni: str = Field(..., min_length=5, example="35123456")
    email: Optional[EmailStr] = Field(None, example="juan@email.com")
    phone: Optional[str] = Field(None, example="+541122334455")
    address: Optional[str] = None
    tenant_id: UUID

class ClientCreate(ClientBase):
    pass 

class ClientResponse(ClientBase):
    id: UUID
    class Config:
        from_attributes = True