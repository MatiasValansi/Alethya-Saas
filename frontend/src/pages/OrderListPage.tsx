import { useState } from 'react';
import { useOrders } from "@/hooks/useOrders";
import { OrderTable } from "@/components/orders/OrderTable";
import { OrderForm } from "@/components/orders/OrderForm";
import { ShoppingCart } from "lucide-react";

export const OrderListPage = () => {
  const { orders, isLoading, error, addOrder, deleteOrder } = useOrders();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    await addOrder(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de cancelar este pedido?")) {
      await deleteOrder(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <OrderForm onSubmit={handleSubmit} />
        </div>
        <div className="lg:col-span-3">
          {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
          <OrderTable 
            orders={orders} 
            onView={(id) => console.log("Ver detalle", id)} 
            onDelete={handleDelete} 
          />
        </div>
      </div>
    </div>
  );
};