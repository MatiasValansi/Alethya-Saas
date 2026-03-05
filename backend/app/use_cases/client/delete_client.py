from uuid import UUID
from app.domain.repositories.client_repository import ClientRepository


class DeleteClientUseCase:
    def __init__(self, client_repo: ClientRepository):
        self.client_repo = client_repo

    def execute(self, client_id: UUID, tenant_id: UUID) -> bool:
        # Validación de propiedad previa al borrado físico
        client = self.client_repo.get_by_id(client_id, tenant_id)
        if not client:
            raise ValueError("No se puede eliminar: el cliente no existe o no le pertenece.")
            
        return self.client_repo.delete(client_id, tenant_id)