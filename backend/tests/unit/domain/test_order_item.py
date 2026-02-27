import pytest
from uuid import uuid4
from app.domain.entities.order_item import OrderItem

def test_order_item_subtotal_calculation():
    """Verifica que el subtotal de una línea de pedido sea correcto."""
    # Arrange: 2 Pantalones de $45.000 cada uno
    product_id = uuid4()
    quantity = 2
    unit_price = 45000.0
    
    # Act
    item = OrderItem(product_id=product_id, quantity=quantity, unit_price=unit_price)
    
    # Assert
    assert item.subtotal == 90000.0

def test_order_item_initialization():
    """Asegura que los datos se asignen correctamente al crearse."""
    p_id = uuid4()
    item = OrderItem(product_id=p_id, quantity=1, unit_price=10.0)
    
    assert item.product_id == p_id
    assert item.quantity == 1
    assert item.unit_price == 10.0