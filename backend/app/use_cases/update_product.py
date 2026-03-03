from uuid import UUID
from app.domain.repositories.product_repository import ProductRepository


class UpdateProductUseCase:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    def execute(self, product_id: UUID, tenant_id: UUID, new_data: dict):
        # 1. Orquestación: Buscar el producto
        product = self.product_repo.get_by_id(product_id, tenant_id)
        if not product:
            raise ValueError("Producto no encontrado")

        # 2. Lógica de Negocio: Usar la regla de la entidad
        product.update_data(
            name=new_data["name"],
            price=new_data["price"],
            stock=new_data["stock"]
        )

        # 3. Persistencia: Guardar los cambios
        self.product_repo.update(product)
        return product