from uuid import UUID
from app.domain.repositories.order_repository import OrderRepository


class GetOrderByIdUseCase:
    def __init__(self, repo: OrderRepository):
        self.repo = repo

    def execute(self, order_id: UUID, tenant_id: UUID):
        order = self.repo.get_by_id(order_id, tenant_id)
        if not order:
            raise ValueError("La venta solicitada no existe")
        return order