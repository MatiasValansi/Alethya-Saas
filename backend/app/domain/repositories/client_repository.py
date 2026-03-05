from abc import ABC, abstractmethod
from typing import List, Optional
from uuid import UUID
from app.domain.entities.client import Client


class ClientRepository(ABC):
    @abstractmethod
    def save(self, client: Client) -> Client:
        """Persiste un nuevo cliente en la DB."""
        pass

    @abstractmethod
    def get_by_id(self, client_id: UUID, tenant_id: UUID)  -> Optional[Client]:
        """Busca un cliente por ID asegurando aislamiento por tenant."""
        pass

    @abstractmethod
    def get_all(self, tenant_id: UUID) -> List[Client]:
        """Obtiene todos los clientes pertenecientes a un tenant específico."""
        pass

    @abstractmethod
    def update(self, client: Client) -> Optional[Client]:
        """Guarda los cambios de un cliente ya existente."""
        pass

    @abstractmethod
    def delete(self, client_id: UUID, tenant_id: UUID) -> bool:
        """Elimina un cliente de la DB devolviendo éxito/error."""
        pass