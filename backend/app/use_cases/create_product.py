from app.domain.entities.product import Product
from app.domain.repositories.product_repository import ProductRepository
from app.domain.exceptions import ProductAlreadyExistsError
from .create_order import CreateOrderUseCase # Solo como referencia de la carpeta

class CreateProductUseCase:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    def execute(self, product_data: Product) -> Product:
        if self.product_repo.get_by_code(product_data.code, product_data.tenant_id):
            raise ProductAlreadyExistsError(product_data.code)
            
        return self.product_repo.save(product_data)