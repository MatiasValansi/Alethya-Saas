from uuid import UUID

from app.domain.repositories.client_repository import ClientRepository


class UpdateClientUseCase:
    def __init__(self, client_repo: ClientRepository):
        self.client_repo = client_repo

    def execute(self, client_id: UUID, tenant_id: UUID, update_data: dict) -> Client:
        # Verificar existencia y propiedad
        existing_client = self.client_repo.get_by_id(client_id, tenant_id)
        if not existing_client:
            raise ValueError("Cliente no encontrado o acceso denegado.")

        # Si se intenta cambiar el DNI, validar que no esté duplicado
        new_dni = update_data.get('dni')
        if new_dni and new_dni != existing_client.dni:
            # Buscamos si el DNI nuevo ya lo tiene ALGUIEN MÁS en el mismo tenant
            all_clients = self.client_repo.get_all(tenant_id)
            if any(c.dni == new_dni and c.id != client_id for c in all_clients):
                raise ValueError(f"No se puede actualizar: El DNI {new_dni} ya pertenece a otro cliente.")

        # Aplicar cambios a la entidad - --> esto dispara validaciones de Dominio)
        for key, value in update_data.items():
            if hasattr(existing_client, key):
                setattr(existing_client, key, value)
        
        # Re-validar el objeto completo tras los cambios
        existing_client.__post_init__()

        # Lo guarda en la BD.
        return self.client_repo.update(existing_client)