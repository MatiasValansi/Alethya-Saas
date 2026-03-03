from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.infrastructure.db.database import get_db
from app.infrastructure.api.schemas import ProductCreate, ProductResponse
from app.infrastructure.repositories.sqlalchemy_product_repository import SqlAlchemyProductRepository
from app.use_cases.create_product import CreateProductUseCase
from app.domain.entities.product import Product
from typing import List
from app.infrastructure.db.models import ProductModel
from app.use_cases.update_product import UpdateProductUseCase
from app.use_cases.delete_product import DeleteProductUseCase
from app.use_cases.get_all_products import GetAllProductsUseCase


router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=ProductResponse)
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    # Instanciar dependencias
    repo = SqlAlchemyProductRepository(db)
    use_case = CreateProductUseCase(repo)
    
    # Convertir Schema a Entidad de Dominio
    product_entity = Product(
        name=product_in.name,
        description=product_in.description,
        price=product_in.price,
        stock=product_in.stock,
        code=product_in.code,
        tenant_id=product_in.tenant_id
    )
    
    # Ejecutar
    created_product = use_case.execute(product_entity)
    return created_product

@router.delete("/{product_id}")
def delete_product(product_id: UUID, tenant_id: UUID, db: Session = Depends(get_db)):
    repo = SqlAlchemyProductRepository(db)
    use_case = DeleteProductUseCase(repo)
    
    try:
        use_case.execute(product_id, tenant_id)
        return {"status": "success", "message": "Producto eliminado"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: UUID, product_in: ProductCreate, db: Session = Depends(get_db)):
    repo = SqlAlchemyProductRepository(db)
    use_case = UpdateProductUseCase(repo)
    
    try:
        updated = use_case.execute(product_id, product_in.tenant_id, product_in.model_dump())
        return updated
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))    

@router.get("/", response_model=list[ProductResponse])
def get_products(tenant_id: UUID, db: Session = Depends(get_db)):
    repo = SqlAlchemyProductRepository(db)
    use_case = GetAllProductsUseCase(repo)
    
    return use_case.execute(tenant_id)