export interface OrderItem {
  product_id: string;
  quantity: number;
}

export interface Order {
  id?: string;
  client_id: string;
  tenant_id: string;
  items: OrderItem[];
  total?: number;
  created_at?: string;
}

export interface CreateOrderDTO {
  client_id: string;
  tenant_id: string;
  items: OrderItem[];
}