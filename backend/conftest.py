import pytest
from uuid import uuid4
from app.domain.entities.product import Product
from app.domain.entities.client import Client

@pytest.fixture
def tenant_id():
    """Genera un ID de organización único para los tests."""
    return uuid4()

@pytest.fixture
def sample_product(tenant_id):
    """Fixture que entrega una Remera lista para testear."""
    return Product(
        name="Remera Oversize Blanca",
        description="Algodón Premium",
        price=12000.0,
        stock=20,
        code="CLO-001",
        tenant_id=tenant_id
    )

@pytest.fixture
def sample_client(tenant_id):
    """Fixture que entrega un Cliente listo para testear."""
    return Client(
        dni="12345678",
        name="Juan Perez",
        email="juan@alethya.com",
        phone="1122334455",
        address="Calle Falsa 123",
        tenant_id=tenant_id
    )