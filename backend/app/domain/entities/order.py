from dataclasses import dataclass, field
from datetime import datetime
from uuid import UUID, uuid4
from typing import List
from .order_item import OrderItem

@dataclass
class Order:
    client_id: UUID
    tenant_id: UUID
    items: List[OrderItem] = field(default_factory=list)
    id: UUID = field(default_factory=uuid4)
    created_at: datetime = field(default_factory=datetime.now)

    def add_item(self, product_id: UUID, quantity: int, price: float):
        """Lógica para añadir un item de ropa al pedido."""
        if quantity <= 0:
            raise ValueError("La cantidad debe ser mayor a cero")
        
        item = OrderItem(product_id=product_id, quantity=quantity, unit_price=price)
        self.items.append(item)

    @property
    def total(self) -> float:
        """Calcula el total sumando los subtotales de cada prenda."""
        return sum(item.subtotal for item in self.items)