from app.domain.entities.order import Order
from uuid import uuid4

def test_order_total_calculation_with_clothing():
    # Arrange
    t_id = uuid4()
    c_id = uuid4()
    order = Order(client_id=c_id, tenant_id=t_id)
    
    # Act: Añadimos 2 remeras de $15.000 y 1 pantalón de $30.000
    order.add_item(product_id=uuid4(), quantity=2, price=15000.0)
    order.add_item(product_id=uuid4(), quantity=1, price=30000.0)
    
    # Assert
    assert order.total == 60000.0
    assert len(order.items) == 2