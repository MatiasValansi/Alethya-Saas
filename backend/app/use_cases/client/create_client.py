from app.domain.entities.client import Client
from app.domain.repositories.client_repository import ClientRepository

class CreateClientUseCase:
    def __init__(self, client_repo: ClientRepository):
        self.client_repo = client_repo

    def execute(self, client_data: dict) -> Client:
        # 1. Lógica de Negocio: Verificar si el DNI ya existe para este Tenant
        existing_clients = self.client_repo.get_all(client_data['tenant_id'])
        if any(c.dni == client_data['dni'] for c in existing_clients):
            raise ValueError(f"Ya existe un cliente registrado con el DNI {client_data['dni']}.")

        # 2. Crear la entidad (esto dispara las validaciones del __post_init__)
        new_client = Client(**client_data)

        # 3. Persistir
        return self.client_repo.save(new_client)