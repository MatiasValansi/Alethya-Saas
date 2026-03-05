from uuid import UUID
from app.domain.repositories.product_repository import ProductRepository

class GetAllProductsUseCase:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    def execute(self, tenant_id: UUID):
        # 1. Orquestación: Pedir los productos al repo
        products = self.product_repo.get_all(tenant_id)
        
        # 2. Lógica de Negocio: Ordenar alfabéticamente por nombre
        # Esto asegura una experiencia consistente para el usuario
        return sorted(products, key=lambda p: p.name.lower())