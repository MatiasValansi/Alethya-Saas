from sqlalchemy import UUID, Column, String, Float, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
import uuid
from .database import Base

class ProductModel(Base):
    __tablename__ = "products"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(PG_UUID(as_uuid=True), nullable=False, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False)
    code = Column(String, nullable=False)
    
class ClientModel(Base):
    __tablename__ = "clients"
    
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(PG_UUID(as_uuid=True), nullable=False, index=True) # Index para rapidez
    name = Column(String, nullable=False)
    dni = Column(String, unique=True, nullable=False)
    email = Column(String)
    phone = Column(String)
    address = Column(String)