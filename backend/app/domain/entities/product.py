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

    def increase_stock(self, quantity: int):
        """Repone stock al inventario (ej: al cancelar o editar una orden)."""
        if quantity <= 0:
            raise ValueError("La cantidad a reponer debe ser positiva")
        self.stock += quantity

    def update_price(self, new_price: float):
        """Valida que el precio nunca sea negativo."""
        if new_price < 0:
            raise ValueError("El precio no puede ser negativo")
        self.price = new_price
        
    def update_data(self, name: str, price: float, stock: int):
        """Regla de Negocio: Valida los datos antes de cambiar el estado."""
        if price <= 0:
            raise ValueError("El precio debe ser mayor a cero")
        if stock < 0:
            raise ValueError("El stock no puede ser negativo")
        
        self.name = name
        self.price = price
        self.stock = stock
        
    def can_be_deleted(self) -> bool:
        """Regla de Negocio: Verifica si el producto es apto para borrarse."""
        if self.stock > 1:
            return False 
        return True 