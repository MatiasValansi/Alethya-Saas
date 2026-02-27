from dataclasses import dataclass, field
from uuid import UUID, uuid4

@dataclass
class Product:
    # Atributos de Datos
    name: str
    description: str
    price: float
    stock: int
    code: str  # El código alfanumérico del sistema original
    tenant_id: UUID
    id: UUID = field(default_factory=uuid4)

    # Lógica de Negocio (Migrada del sistema Java)
    def has_stock(self, quantity: int) -> bool:
        """Verifica si hay stock suficiente."""
        return self.stock >= quantity

    def decrease_stock(self, quantity: int):
        """
        Aplica la regla de negocio: Descontar stock.
        Lanza un error si no hay suficiente.
        """
        if not self.has_stock(quantity):
            raise ValueError(f"Stock insuficiente para el producto {self.name}")
        
        self.stock -= quantity

    def update_price(self, new_price: float):
        """Valida que el precio nunca sea negativo."""
        if new_price < 0:
            raise ValueError("El precio no puede ser negativo")
        self.price = new_price