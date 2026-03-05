from uuid import UUID
from app.domain.repositories.client_repository import ClientRepository
from app.domain.entities.client import Client


class GetAllClientsUseCase:
    def __init__(self, client_repo: ClientRepository):
        self.client_repo = client_repo

    def execute(self, tenant_id: UUID) -> list[Client]:
        clients = self.client_repo.get_all(tenant_id)
        return sorted(clients, key=lambda c: c.name.lower())