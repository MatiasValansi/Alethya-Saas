from app.domain.repositories.order_repository import OrderRepository
from app.domain.repositories.product_repository import ProductRepository


class UpdateOrderUseCase:
    def __init__(self, order_repo: OrderRepository, product_repo: ProductRepository):
        self.order_repo = order_repo
        self.product_repo = product_repo

    def execute(self, order_id, tenant_id, order_in):
        # Obtener orden actual
        old_order = self.order_repo.get_by_id(order_id, tenant_id)
        if not old_order:
            raise ValueError("Venta no encontrada")

        # Reversar Stock viejo: la entidad aplica la regla, el repo persiste
        for item in old_order.items:
            product = self.product_repo.get_by_id(item.product_id, tenant_id)
            if product:
                product.increase_stock(item.quantity)
                self.product_repo.update(product)

        # Validar Stock nuevo y retener entidades para no volver a buscarlas
        new_products = {}
        for item in order_in["items"]:
            product = self.product_repo.get_by_id(item["product_id"], tenant_id)
            if not product:
                raise ValueError(f"Producto {item['product_id']} no encontrado")
            if product.stock < item["quantity"]:
                raise ValueError(f"Stock insuficiente para {product.name}")
            new_products[item["product_id"]] = product

        # Actualizar la Orden y descontar nuevo Stock
        updated_order = self.order_repo.update(order_id, tenant_id, order_in, order_in["items"])

        for item in order_in["items"]:
            product = new_products[item["product_id"]]
            product.decrease_stock(item["quantity"])
            self.product_repo.update(product)

        return updated_order