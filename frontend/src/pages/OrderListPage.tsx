import { useState } from 'react';
import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts"; // <--- Importante
import { OrderTable } from "@/components/orders/OrderTable";
import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderCreateView } from '@/components/orders/OrderCreateView';

export const OrderListPage = () => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const { orders, addOrder, deleteOrder } = useOrders();
  const { loadProducts } = useProducts(); // <--- Para arreglar el stock

  const handleCreateOrder = async (data: any) => {
    await addOrder(data);
    await loadProducts();
    setView('list'); 
  };

  if (view === 'create') {
    return <OrderCreateView onCancel={() => setView('list')} onSubmit={handleCreateOrder} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2"><ShoppingCart /> Gestión de Pedidos</h2>
        <Button onClick={() => setView('create')} className="bg-blue-600"><Plus className="mr-2 h-4 w-4" /> Armar nuevo pedido</Button>
      </div>
      <OrderTable orders={orders} onView={() => {}} onDelete={deleteOrder} />
    </div>
  );
};