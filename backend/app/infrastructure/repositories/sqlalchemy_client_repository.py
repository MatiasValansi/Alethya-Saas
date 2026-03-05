from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from app.domain.entities.client import Client
from app.domain.repositories.client_repository import ClientRepository
from app.infrastructure.db.models import ClientModel

class SqlAlchemyClientRepository(ClientRepository):
    def __init__(self, db: Session):
        self.db = db

    def save(self, client: Client) -> Client:
        # Convertimos Entidad -> Modelo de DB
        model = ClientModel(
            id=client.id,
            tenant_id=client.tenant_id,
            name=client.name,
            dni=client.dni,
            email=client.email,
            phone=client.phone,
            address=client.address
        )
        self.db.add(model)
        self.db.commit()
        return client

    def get_by_id(self, client_id: UUID, tenant_id: UUID) -> Optional[Client]:
        model = self.db.query(ClientModel).filter(
            ClientModel.id == client_id,
            ClientModel.tenant_id == tenant_id
        ).first()
        return self._to_entity(model) if model else None
    
    def get_by_dni(self, dni: str, tenant_id: UUID) -> Optional[Client]:
        model = self.db.query(ClientModel).filter(
            ClientModel.dni == dni,
            ClientModel.tenant_id == tenant_id
        ).first()
        
        return self._to_entity(model) if model else None

    def get_all(self, tenant_id: UUID) -> List[Client]:
        models = self.db.query(ClientModel).filter(ClientModel.tenant_id == tenant_id).all()
        return [self._to_entity(m) for m in models]

    def update(self, client: Client) -> Optional[Client]:
        model = self.db.query(ClientModel).filter(
            ClientModel.id == client.id,
            ClientModel.tenant_id == client.tenant_id
        ).first()
        if model:
            model.name = client.name
            model.dni = client.dni
            model.email = client.email
            model.phone = client.phone
            model.address = client.address
            self.db.commit()
            return client
        return None

    def delete(self, client_id: UUID, tenant_id: UUID) -> bool:
        model = self.db.query(ClientModel).filter(
            ClientModel.id == client_id,
            ClientModel.tenant_id == tenant_id
        ).first()
        if model:
            self.db.delete(model)
            self.db.commit()
            return True
        return False

    def _to_entity(self, model: ClientModel) -> Client:
        """Helper para convertir de DB a Dominio."""
        return Client(
            id=model.id,
            tenant_id=model.tenant_id,
            name=model.name,
            dni=model.dni,
            email=model.email,
            phone=model.phone,
            address=model.address
        )