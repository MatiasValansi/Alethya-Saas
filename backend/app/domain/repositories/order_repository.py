from abc import ABC, abstractmethod
from app.domain.entities.order import Order

class OrderRepository(ABC):
    @abstractmethod
    def save(self, order: Order) -> None:
        """Persiste la orden y sus items en la base de datos."""
        pass