from uuid import UUID
from app.domain.repositories.product_repository import ProductRepository

class DeleteProductUseCase:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    def execute(self, product_id: UUID, tenant_id: UUID):
        # 1. Buscar el producto (Orquestación)
        product = self.product_repo.get_by_id(product_id, tenant_id)
        
        if not product:
            raise ValueError("El producto no existe o no tienes permiso.")

        # 2. Validar Regla de Negocio (Domain Logic)
        if not product.can_be_deleted():
            raise ValueError(f"No puedes eliminar '{product.name}' porque tiene mucho stock ({product.stock}).")

        # 3. Persistir el borrado (Infrastructure)
        return self.product_repo.delete(product_id, tenant_id)