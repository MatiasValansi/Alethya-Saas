class InsufficientStockError(Exception):
    def __init__(self, product_name: str, available: int, required: int):
        self.message = (
            f"No queda suficiente stock del producto {product_name}. "
            f"Stock disponible: {available}. Stock requerido: {required}"
        )
        super().__init__(self.message)