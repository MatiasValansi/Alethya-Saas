import pytest
from unittest.mock import MagicMock
from uuid import uuid4
from backend.app.use_cases.order.create_order import CreateOrderUseCase
from app.domain.entities.product import Product
from app.domain.exceptions import InsufficientStockError

def test_create_order_insufficient_stock_raises_exception():
    """
    Verifica que si no hay stock, se lance la excepción personalizada 
    con el mensaje exacto que definimos.
    """
    # 1. Arrange (Preparar)
    mock_product_repo = MagicMock()
    use_case = CreateOrderUseCase(product_repo=mock_product_repo)
    
    t_id = uuid4()
    p_id = uuid4()
    
    # Creamos un producto con stock insuficiente (solo 2)
    remera = Product(
        name="Remera Oversize",
        description="Algodon",
        price=15000.0,
        stock=2,
        code="REM-01",
        tenant_id=t_id,
        id=p_id
    )
    
    # Configuramos el Mock para que devuelva esta remera
    mock_product_repo.get_by_id.return_value = remera
    
    # Datos de la orden: El cliente quiere 5 remeras
    order_data = [{"product_id": p_id, "quantity": 5}]

    # 2. Act & Assert (Actuar y Verificar)
    with pytest.raises(InsufficientStockError) as exc_info:
        use_case.execute(client_id=uuid4(), tenant_id=t_id, items_data=order_data)
    
    # Verificamos que el mensaje sea el que pediste
    expected_msg = (
        f"No queda suficiente stock del producto Remera Oversize. "
        f"Stock disponible: 2. Stock requerido: 5"
    )
    assert str(exc_info.value) == expected_msg

def test_create_order_success_updates_stock():
    """Verifica que en un flujo exitoso, el stock del producto disminuya."""
    # Arrange
    mock_product_repo = MagicMock()
    use_case = CreateOrderUseCase(product_repo=mock_product_repo)
    t_id = uuid4()
    p_id = uuid4()
    
    remera = Product(name="R", description="D", price=100.0, stock=10, code="C", tenant_id=t_id, id=p_id)
    mock_product_repo.get_by_id.return_value = remera
    
    # Act
    use_case.execute(client_id=uuid4(), tenant_id=t_id, items_data=[{"product_id": p_id, "quantity": 3}])
    
    # Assert
    assert remera.stock == 7 # 10 - 3
    mock_product_repo.update.assert_called_once_with(remera)