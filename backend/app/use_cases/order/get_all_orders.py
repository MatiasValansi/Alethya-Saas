from uuid import UUID
from app.domain.repositories.order_repository import OrderRepository


class GetAllOrdersUseCase:
    def __init__(self, repo: OrderRepository):
        self.repo = repo

    def execute(self, tenant_id: UUID):
        return self.repo.get_all(tenant_id)