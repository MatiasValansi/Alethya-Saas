from app.domain.repositories.order_repository import OrderRepository
from app.domain.repositories.product_repository import ProductRepository


class UpdateOrderUseCase:
    def __init__(self, order_repo:OrderRepository, product_repo:ProductRepository):
        self.order_repo = order_repo
        self.product_repo = product_repo

    def execute(self, order_id, tenant_id, order_in):
        # Obtener orden actual
        old_order = self.order_repo.get_by_id(order_id, tenant_id)
        if not old_order: raise ValueError("Venta no encontrada")

        # Reversar Stock viejo (Devolver todo al estante)
        for item in old_order.items:
            self.product_repo.update(item.product_id, tenant_id, item.quantity)

        # Validar Stock nuevo (Verificar si lo nuevo alcanza)
        for item in order_in["items"]:
            product = self.product_repo.get_by_id(item["product_id"], tenant_id)
            if product.stock < item["quantity"]:
                # Si no alcanza, deshacemos la reversión
                raise ValueError(f"Stock insuficiente para {product.name}")

        # Actualizar la Orden y descontar nuevo Stock
        updated_order = self.order_repo.update(order_id, tenant_id, order_in, order_in["items"])
        
        for item in order_in["items"]:
            self.product_repo.update(item["product_id"], tenant_id, -item["quantity"])

        return updated_order