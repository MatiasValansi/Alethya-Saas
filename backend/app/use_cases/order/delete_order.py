from app.domain.repositories.order_repository import OrderRepository
from app.domain.repositories.product_repository import ProductRepository
from uuid import UUID


class DeleteOrderUseCase:
    def __init__(self, order_repo: OrderRepository, product_repo: ProductRepository):
        self.order_repo = order_repo
        self.product_repo = product_repo

    def execute(self, order_id: UUID, tenant_id: UUID):
        order = self.order_repo.get_by_id(order_id, tenant_id)
        if not order:
            raise ValueError("La venta no existe o no pertenece a este comercio")

        # Restaurar stock: la entidad aplica la regla, el repo persiste
        for item in order.items:
            product = self.product_repo.get_by_id(item.product_id, tenant_id)
            if product:
                product.increase_stock(item.quantity)
                self.product_repo.update(product)

        # Borramos la orden (SQLAlchemy se encarga de los items por el cascade delete)
        self.order_repo.delete(order_id, tenant_id)