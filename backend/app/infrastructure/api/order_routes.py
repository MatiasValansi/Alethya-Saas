from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.infrastructure.db.database import get_db
from app.infrastructure.api.schemas import OrderCreate, OrderResponse
from app.infrastructure.repositories.sqlalchemy_order_repository import SqlAlchemyOrderRepository
from app.infrastructure.repositories.sqlalchemy_product_repository import SqlAlchemyProductRepository
from app.use_cases.order.create_order import CreateOrderUseCase

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