from app.domain.entities.product import Product
from app.domain.repositories.product_repository import ProductRepository
from .create_order import CreateOrderUseCase # Solo como referencia de la carpeta

class CreateProductUseCase:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    def execute(self, product_data: Product) -> Product:
        # Aquí podrías poner lógica extra, ej: validar que el código no esté repetido
        return self.product_repo.save(product_data)