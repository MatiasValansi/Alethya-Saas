from uuid import UUID
from app.domain.repositories.client_repository import ClientRepository
from app.domain.entities.client import Client


class UpdateClientUseCase:
    def __init__(self, client_repo: ClientRepository):
        self.client_repo = client_repo

    def execute(self, client_id: UUID, tenant_id: UUID, update_data: dict) -> Client:
        # Verificar existencia y propiedad
        existing_client = self.client_repo.get_by_id(client_id, tenant_id)
        if not existing_client:
            raise ValueError("Cliente no encontrado.")

        # Si quiere cambiar el DNI, verificamos que el NUEVO no esté ocupado
        new_dni = update_data.get('dni')
        if new_dni and new_dni != existing_client.dni:
            collision = self.client_repo.get_by_dni(new_dni, tenant_id)
            # Si alguien MÁS tiene ese DNI, bloqueamos
            if collision and collision.id != client_id:
                raise ValueError(f"El DNI {new_dni} ya lo tiene otro cliente.")
        
        # Aplicar cambios a la entidad - --> esto dispara validaciones de Dominio)
        for key, value in update_data.items():
            if hasattr(existing_client, key):
                setattr(existing_client, key, value)
        
        # Re-validar el objeto completo tras los cambios
        existing_client.__post_init__()

        # Lo guarda en la BD.
        return self.client_repo.update(existing_client)