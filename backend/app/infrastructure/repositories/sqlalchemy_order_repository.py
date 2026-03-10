from sqlalchemy.orm import Session
from app.infrastructure.db.models import OrderModel, OrderItemModel, ProductModel
from uuid import UUID
from typing import List

class SqlAlchemyOrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, order_data: dict, items_data: List[dict]) -> OrderModel:
        # Calculamos el total y preparamos los items con el precio actual del producto
        total_order = 0.0
        order_items_models = []

        for item in items_data:
            # Buscamos el producto para obtener su precio real y stock
            product = self.db.query(ProductModel).filter(
                ProductModel.id == item["product_id"],
                ProductModel.tenant_id == order_data["tenant_id"]
            ).first()

            if not product:
                raise ValueError(f"Producto {item['product_id']} no encontrado")

            # Calculamos el subtotal de este item
            price_at_sale = product.price
            total_order += price_at_sale * item["quantity"]

            # Creamos el modelo del item (sin el order_id aún, SQLAlchemy lo pondrá solo)
            item_model = OrderItemModel(
                product_id=product.id,
                quantity=item["quantity"],
                price_at_sale=price_at_sale
            )
            order_items_models.append(item_model)

        # Creamos el modelo de la Orden
        new_order = OrderModel(
            tenant_id=order_data["tenant_id"],
            client_id=order_data.get("client_id"),
            total=total_order,
            status="completed",
            items=order_items_models
        )

        self.db.add(new_order)
        self.db.commit()
        self.db.refresh(new_order)
        return new_order
    
    def get_all(self, tenant_id: UUID):
        # Retorna todas las ventas de un comercio específico
        return self.db.query(OrderModel).filter(OrderModel.tenant_id == tenant_id).all()

    def get_by_id(self, order_id: UUID, tenant_id: UUID):
        # Busca una venta puntual asegurando el aislamiento del tenant
        return self.db.query(OrderModel).filter(
            OrderModel.id == order_id,
            OrderModel.tenant_id == tenant_id
        ).first()
        
    def delete(self, order_id: UUID, tenant_id: UUID):
        order = self.get_by_id(order_id, tenant_id)
        if order:
            self.db.delete(order)
            self.db.commit()
            
    def update(self, order_id: UUID, tenant_id: UUID, order_data: dict, items_data: List[dict]):
        order = self.get_by_id(order_id, tenant_id)
        
        # Limpiamos los items viejos
        self.db.query(OrderItemModel).filter(OrderItemModel.order_id == order_id).delete()
        
        # Calculamos nuevo total y preparamos items
        new_total = 0.0
        new_items = []
        for item in items_data:
            prod = self.db.query(ProductModel).filter(ProductModel.id == item["product_id"]).first()
            new_total += prod.price * item["quantity"]
            new_items.append(OrderItemModel(
                product_id=prod.id, 
                quantity=item["quantity"], 
                price_at_sale=prod.price
            ))

        order.total = new_total
        order.client_id = order_data.get("client_id")
        order.items = new_items
        
        self.db.commit()
        self.db.refresh(order)
        return order