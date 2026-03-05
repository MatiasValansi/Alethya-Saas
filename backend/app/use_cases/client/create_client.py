from app.domain.entities.client import Client
from app.domain.repositories.client_repository import ClientRepository

class CreateClientUseCase:
    def __init__(self, client_repo: ClientRepository):
        self.client_repo = client_repo

    def execute(self, client_data: dict) -> Client:
        existing = self.client_repo.get_by_dni(client_data['dni'], client_data['tenant_id'])
        
        if existing:
            raise ValueError(f"Ya existe un cliente con el DNI {client_data['dni']}.")

        new_client = Client(**client_data)
        return self.client_repo.save(new_client)