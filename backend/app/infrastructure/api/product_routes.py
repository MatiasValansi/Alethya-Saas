from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.infrastructure.db.database import get_db
from app.infrastructure.api.schemas import ProductCreate, ProductResponse
from app.infrastructure.repositories.sqlalchemy_product_repository import SqlAlchemyProductRepository
from app.use_cases.create_product import CreateProductUseCase
from app.domain.entities.product import Product

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=ProductResponse)
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    # 1. Instanciar dependencias
    repo = SqlAlchemyProductRepository(db)
    use_case = CreateProductUseCase(repo)
    
    # 2. Convertir Schema a Entidad de Dominio
    product_entity = Product(
        name=product_in.name,
        description=product_in.description,
        price=product_in.price,
        stock=product_in.stock,
        code=product_in.code,
        tenant_id=product_in.tenant_id
    )
    
    # 3. Ejecutar
    created_product = use_case.execute(product_entity)
    return created_product