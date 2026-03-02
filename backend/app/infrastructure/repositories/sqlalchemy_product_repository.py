from typing import Optional
from uuid import UUID
from sqlalchemy.orm import Session
from app.domain.entities.product import Product
from app.domain.repositories.product_repository import ProductRepository
from db.models import ProductModel
from sqlalchemy.exc import SQLAlchemyError
import logging

class SqlAlchemyProductRepository(ProductRepository):
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, product_id: UUID, tenant_id: UUID) -> Optional[Product]:
        # Buscamos en la DB usando el modelo de SQLAlchemy
        model = self.db.query(ProductModel).filter(
            ProductModel.id == product_id,
            ProductModel.tenant_id == tenant_id
        ).first()

        if not model:
            return None

        # MAPEEO: Transformamos el modelo de DB a nuestra Entidad de Dominio
        return Product(
            id=model.id,
            tenant_id=model.tenant_id,
            name=model.name,
            description=model.description,
            price=model.price,
            stock=model.stock,
            code=model.code
        )

    def save(self, product: Product) -> Product:
        # 1. Mapeo de Entidad -> Modelo
        model = ProductModel(
            id=product.id,
            tenant_id=product.tenant_id,
            name=product.name,
            description=product.description,
            price=product.price,
            stock=product.stock,
            code=product.code
        )
        
        try:
            self.db.add(model)
            self.db.commit() # Guardamos físicamente
            self.db.refresh(model)
            return product
        except SQLAlchemyError as e:
            self.db.rollback() # ¡Vital! Si algo falla, limpiamos la transacción
            logging.error(f"Error al guardar producto: {str(e)}")
            raise e # Re-lanzamos para que el controlador pueda informar el error

    def update(self, product: Product) -> None:
        model = self.db.query(ProductModel).filter(
            ProductModel.id == product.id
        ).first()
        
        if model:
            model.stock = product.stock # Actualizamos el stock tras la venta
            self.db.commit()