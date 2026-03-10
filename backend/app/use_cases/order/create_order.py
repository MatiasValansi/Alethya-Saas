from app.infrastructure.repositories.sqlalchemy_order_repository import SqlAlchemyOrderRepository
from app.infrastructure.repositories.sqlalchemy_product_repository import SqlAlchemyProductRepository
from uuid import UUID
from app.domain.repositories.product_repository import ProductRepository
from app.domain.repositories.order_repository import OrderRepository

class CreateOrderUseCase:
    def __init__(self, order_repo: OrderRepository, product_repo: ProductRepository):
        self.order_repo = order_repo
        self.product_repo = product_repo

    def execute(self, order_data: dict, items: list):
        # Validar Stock antes de hacer nada
        for item in items:
            product = self.product_repo.get_by_id(item["product_id"], order_data["tenant_id"])
            if not product:
                raise ValueError(f"Producto {item['product_id']} no encontrado")
            
            if product.stock < item["quantity"]:
                raise ValueError(f"Stock insuficiente para {product.name}. Disponible: {product.stock}")

        # Guardar la Venta (El repo ya calcula el total y crea los items)
        new_order = self.order_repo.save(order_data, items)

        # Descontar Stock del Inventario
        for item in items:
            self.product_repo.update(id=item["product_id"], 
                tenant_id=order_data["tenant_id"], 
                quantity=-item["quantity"] # Valor negativo para restar
            )

        return new_order