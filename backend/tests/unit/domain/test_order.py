import pytest
from app.domain.entities.product import Product
from uuid import uuid4

# Este test fallará porque Order e Item todavía no existen
def test_order_total_calculation_with_clothing():
    # Arrange (Preparar)
    tenant_id = uuid4()
    remera = Product(
        name="Remera Oversize",
        description="Algodón 100%",
        price=15000.0,
        stock=50,
        code="REM-001",
        tenant_id=tenant_id
    )
    
    # Act (Actuar) - Aquí es donde fallará porque no tenemos Order
    # Imaginamos cómo queremos que sea la interfaz:
    # order = Order(client_id=uuid4(), tenant_id=tenant_id)
    # order.add_item(product=remera, quantity=3)
    
    # Assert (Afirmar)
    # assert order.total == 45000.0
    # assert remera.stock == 47
    pass