from app.domain.repositories.order_repository import OrderRepository
from app.infrastructure.repositories.sqlalchemy_product_repository import SqlAlchemyProductRepository
from uuid import UUID

class DeleteOrderUseCase:
    def __init__(self, order_repo: OrderRepository, product_repo: SqlAlchemyProductRepository):
        self.order_repo = order_repo
        self.product_repo = product_repo

    def execute(self, order_id: UUID, tenant_id: UUID):
        # Buscamos la orden para saber qué productos tenía
        order = self.order_repo.get_by_id(order_id, tenant_id)
        if not order:
            raise ValueError("La venta no existe o no pertenece a este comercio")

        # Restauramos el stock de cada producto
        # Recorremos los items y sumamos la cantidad de vuelta al inventario
        for item in order.items:
            self.product_repo.update(
                product_id=item.product_id, 
                tenant_id=tenant_id, 
                quantity=item.quantity # Cantidad positiva para REponer
            )

        # Borramos la orden (SQLAlchemy se encarga de los items por el cascade delete)
        self.order_repo.delete(order_id, tenant_id)