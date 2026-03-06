from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.infrastructure.db.database import get_db
from app.infrastructure.repositories.sqlalchemy_client_repository import SqlAlchemyClientRepository
from app.use_cases.client.create_client import CreateClientUseCase
from app.use_cases.client.get_all_clients import GetAllClientsUseCase
from app.use_cases.client.update_client import UpdateClientUseCase
from app.use_cases.client.delete_client import DeleteClientUseCase
from .schemas import ClientCreate, ClientResponse

router = APIRouter(prefix="/clients", tags=["Clients"])

@router.post("/", response_model=ClientResponse)
def create_client(client_in: ClientCreate, db: Session = Depends(get_db)):
    repo = SqlAlchemyClientRepository(db)
    use_case = CreateClientUseCase(repo)
    try:
        # Convertimos el schema de Pydantic a un diccionario para el Use Case
        return use_case.execute(client_in.dict())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=list[ClientResponse])
def get_clients(tenant_id: UUID, db: Session = Depends(get_db)):
    repo = SqlAlchemyClientRepository(db)
    use_case = GetAllClientsUseCase(repo)
    # El tenant_id es obligatorio para el aislamiento
    return use_case.execute(tenant_id)

@router.put("/{client_id}", response_model=ClientResponse)
def update_client(client_id: UUID, tenant_id: UUID, client_in: ClientCreate, db: Session = Depends(get_db)):
    repo = SqlAlchemyClientRepository(db)
    use_case = UpdateClientUseCase(repo)
    try:
        return use_case.execute(client_id, tenant_id, client_in.dict())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{client_id}")
def delete_client(client_id: UUID, tenant_id: UUID, db: Session = Depends(get_db)):
    repo = SqlAlchemyClientRepository(db)
    use_case = DeleteClientUseCase(repo)
    try:
        use_case.execute(client_id, tenant_id)
        return {"status": "success", "message": "Cliente eliminado"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))