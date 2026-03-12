import { useOrders } from "@/hooks/useOrders";
import { OrderTable } from "@/components/orders/OrderTable";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw, Package } from "lucide-react";

export const OrderListPage = () => {
  const { orders, isLoading, error, loadOrders, deleteOrder } = useOrders();

  const handleViewOrder = (id: string) => {
    console.log("Navegando al detalle del pedido:", id);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Encabezado de la Página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Visualiza y gestiona las ventas realizadas en tu tienda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={loadOrders} disabled={isLoading} title="Refrescar datos">
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Pedido
          </Button>
        </div>
      </div>

      {/* Manejo de Errores */}
      {error && (
        <div className="bg-destructive/10 border-l-4 border-destructive p-4 text-destructive rounded-r-md">
          <p className="font-medium">Error de conexión</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Tabla de Datos */}
      <div className="min-h-[400px]">
        {orders.length > 0 ? (
          <OrderTable 
            orders={orders} 
            onView={handleViewOrder} 
            onDelete={deleteOrder} 
          />
        ) : !isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl bg-slate-50/50">
            <Package className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No hay pedidos</h3>
            <p className="text-slate-500">Comienza creando tu primer pedido para ver la lista.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};