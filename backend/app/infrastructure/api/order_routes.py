from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.infrastructure.db.database import get_db
from app.infrastructure.api.schemas import OrderCreate, OrderResponse
from app.infrastructure.repositories.sqlalchemy_order_repository import SqlAlchemyOrderRepository
from app.infrastructure.repositories.sqlalchemy_product_repository import SqlAlchemyProductRepository
from app.use_cases.order.create_order import CreateOrderUseCase
from app.use_cases.order.get_all_orders import GetAllOrdersUseCase
from app.use_cases.order.get_by_id_order import GetOrderByIdUseCase
from app.use_cases.order.delete_order import DeleteOrderUseCase
from app.use_cases.order.update_order import UpdateOrderUseCase

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=OrderResponse)
def create_order(order_in: OrderCreate, db: Session = Depends(get_db)):
    order_repo = SqlAlchemyOrderRepository(db)
    product_repo = SqlAlchemyProductRepository(db)
    
    use_case = CreateOrderUseCase(order_repo, product_repo)
    
    try:
        order_data = {"tenant_id": order_in.tenant_id, "client_id": order_in.client_id}
        items_data = [item.dict() for item in order_in.items]
        
        return use_case.execute(order_data, items_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[OrderResponse])
def get_all_orders(tenant_id: UUID, db: Session = Depends(get_db)):
    repo = SqlAlchemyOrderRepository(db)
    use_case = GetAllOrdersUseCase(repo)
    return use_case.execute(tenant_id)

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: UUID, tenant_id: UUID, db: Session = Depends(get_db)):
    repo = SqlAlchemyOrderRepository(db)
    use_case = GetOrderByIdUseCase(repo)
    try:
        return use_case.execute(order_id, tenant_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.delete("/{order_id}")
def delete_order(order_id: UUID, tenant_id: UUID, db: Session = Depends(get_db)):
    repo = SqlAlchemyOrderRepository(db)
    product_repo = SqlAlchemyProductRepository(db) # Necesario para el stock
    use_case = DeleteOrderUseCase(repo, product_repo)
    
    try:
        use_case.execute(order_id, tenant_id)
        return {"message": "Venta eliminada con éxito y stock restaurado en el inventario"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.put("/{order_id}", response_model=OrderResponse)
def update_order(order_id: UUID, order_in: OrderCreate, db: Session = Depends(get_db)):
    use_case = UpdateOrderUseCase(SqlAlchemyOrderRepository(db), SqlAlchemyProductRepository(db))
    try:
        return use_case.execute(order_id, order_in.tenant_id, order_in.dict())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))