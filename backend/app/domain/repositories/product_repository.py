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
    def update(self, product: Product) -> None:
        """Persiste los cambios de stock en la DB."""
        pass