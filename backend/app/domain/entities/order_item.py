from dataclasses import dataclass
from uuid import UUID

@dataclass
class OrderItem:
    product_id: UUID
    quantity: int
    unit_price: float

    @property
    def subtotal(self) -> float:
        return self.quantity * self.unit_price