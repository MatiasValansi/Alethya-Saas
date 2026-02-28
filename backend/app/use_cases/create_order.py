from uuid import UUID
from app.domain.entities.order import Order
from app.domain.repositories.product_repository import ProductRepository
from app.domain.exceptions import InsufficientStockError

class CreateOrderUseCase:
    def __init__(self, product_repo: ProductRepository):
        # Inyección de dependencias: No sabemos si es SQL o Memoria, 
        # solo que cumple con la interfaz.
        self.product_repo = product_repo

    def execute(self, client_id: UUID, tenant_id: UUID, items_data: list):
        order = Order(client_id=client_id, tenant_id=tenant_id)

        for item in items_data:
            product = self.product_repo.get_by_id(item["product_id"], tenant_id)
            
            if not product:
                raise ValueError("Producto no encontrado")

            # Regla de Negocio: Validar y Descontar
            if not product.has_stock(item["quantity"]):
                raise InsufficientStockError(
                    product_name=product.name,
                    available=product.stock,
                    required=item["quantity"]
                )

            product.decrease_stock(item["quantity"])
            order.add_item(product.id, item["quantity"], product.price)
            
            # Guardamos el cambio de stock
            self.product_repo.update(product)

        # Aquí iría el order_repository.save(order) que definiremos luego
        return order