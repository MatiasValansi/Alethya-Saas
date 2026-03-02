class InsufficientStockError(Exception):
    def __init__(self, product_name: str, available: int, required: int):
        self.message = (
            f"No queda suficiente stock del producto {product_name}. "
            f"Stock disponible: {available}. Stock requerido: {required}"
        )
        super().__init__(self.message)

class ProductAlreadyExistsError(Exception):
    def __init__(self, code: str):
        self.message = f"Ya existe un producto con el código {code}."
        super().__init__(self.message)
