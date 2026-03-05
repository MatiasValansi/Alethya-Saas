from uuid import UUID
from app.domain.repositories.product_repository import ProductRepository


class UpdateProductUseCase:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    def execute(self, product_id: UUID, tenant_id: UUID, new_data: dict):
        # 1. Traemos la entidad (Aquí SQLAlchemy ya tiene el objeto en "seguimiento")
        product = self.product_repo.get_by_id(product_id, tenant_id)
        if not product:
            raise ValueError("Producto no encontrado")

        # 2. Validamos y actualizamos en memoria (Lógica de Dominio)
        product.update_data(
            name=new_data["name"],
            price=new_data["price"],
            stock=new_data["stock"]
        )

        # 3. Persistimos (Una sola operación de guardado)
        return self.product_repo.update(product)