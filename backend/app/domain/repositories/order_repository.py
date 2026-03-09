from abc import ABC, abstractmethod
from typing import List
from uuid import UUID
from app.domain.entities.order import Order

class OrderRepository(ABC):
    @abstractmethod
    def save(self, order: Order) -> None:
        """Persiste la orden y sus items en la base de datos."""
        pass
    
    @abstractmethod
    def get_all(self, tenant_id: UUID) -> List:
        """Trae todas las órdenes de un tenant específico."""
        pass

    @abstractmethod
    def get_by_id(self, order_id: UUID, tenant_id: UUID) -> Order:
        """Trae una orden por su ID y tenant_id."""
        pass
    
    @abstractmethod
    def delete(self, order_id: UUID, tenant_id: UUID):
        """Elimina una orden por su ID y tenant_id."""
        pass