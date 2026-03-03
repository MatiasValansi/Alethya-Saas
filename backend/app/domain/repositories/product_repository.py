from abc import ABC, abstractmethod
from uuid import UUID
from typing import Optional
from app.domain.entities.product import Product

class ProductRepository(ABC):
    @abstractmethod
    def get_by_id(self, product_id: UUID, tenant_id: UUID) -> Optional[Product]:
        """Busca un producto por ID asegurando que pertenezca al mismo comercio (SaaS)."""
        pass

    @abstractmethod
    def get_by_code(self, code: str, tenant_id: UUID) -> Optional[Product]:
        """Busca un producto por su código identificador, filtrado por tenant."""
        pass

    @abstractmethod
    def save(self, product: Product) -> Product:
        """Persiste un nuevo producto en la DB."""
        pass    
    
    @abstractmethod
    def delete(self, product_id: UUID, tenant_id: UUID) -> bool:
        """Elimina un producto de la DB."""
        pass
    
    @abstractmethod
    def update(self, product: Product) -> Optional[Product]:
        """Guarda los cambios de una entidad ya existente."""
        pass