from uuid import UUID
from app.domain.entities.order import Order
from app.domain.repositories.product_repository import ProductRepository
from app.domain.repositories.order_repository import OrderRepository # Nuevo
from app.domain.exceptions import InsufficientStockError

class CreateOrderUseCase:
    def __init__(self, product_repo: ProductRepository, order_repo: OrderRepository):
        self.product_repo = product_repo
        self.order_repo = order_repo # Inyección del repositorio de órdenes

    def execute(self, client_id: UUID, tenant_id: UUID, items_data: list) -> Order:
        order = Order(client_id=client_id, tenant_id=tenant_id)

        for item in items_data:
            product = self.product_repo.get_by_id(item["product_id"], tenant_id)
            
            if not product:
                raise ValueError("Producto no encontrado")

            if not product.has_stock(item["quantity"]):
                raise InsufficientStockError(
                    product_name=product.name,
                    available=product.stock,
                    required=item["quantity"]
                )

            product.decrease_stock(item["quantity"])
            order.add_item(product.id, item["quantity"], product.price)
            
            self.product_repo.update(product)

        # Paso final: Persistir la orden completa
        self.order_repo.save(order) 
        return order