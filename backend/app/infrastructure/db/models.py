from sqlalchemy import UUID, Column, DateTime, String, Float, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
import uuid
from .database import Base
from sqlalchemy.orm import relationship
from datetime import datetime

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
    
class OrderModel(Base):
    __tablename__ = "orders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    total = Column(Float, default=0.0)
    status = Column(String, default="completed") # completed, pending, cancelled
    
    # Relación con el Cliente (FK)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"), nullable=True)
    
    # Relación para acceder a los items fácilmente
    items = relationship("OrderItemModel", back_populates="order", cascade="all, delete-orphan")