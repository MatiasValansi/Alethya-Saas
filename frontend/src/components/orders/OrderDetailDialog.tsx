import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Order } from "@/types/order";
import { Package, Calendar, User, DollarSign, Tag } from "lucide-react";
import { useProducts } from "@/hooks/useProducts"; // Importamos los hooks
import { useClients } from "@/hooks/useClients";

interface OrderDetailDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailDialog = ({ order, isOpen, onClose }: OrderDetailDialogProps) => {
  const { products } = useProducts();
  const { clients } = useClients();

  if (!order) return null;

  // 🔍 JOIN: Buscar el nombre del cliente
  const client = clients.find((c) => c.id === order.client_id);
  const clientName = client ? client.name : "Cliente no encontrado";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            Detalle del Pedido #{order.id?.slice(-6).toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-slate-100 my-2">
          <div className="flex items-center gap-3 text-sm p-3 bg-slate-50 rounded-lg">
            <User className="h-5 w-5 text-blue-500" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400">Cliente</span>
              <span className="font-bold text-slate-700">{clientName}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm p-3 bg-slate-50 rounded-lg">
            <Calendar className="h-5 w-5 text-orange-500" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400">Fecha de Venta</span>
              <span className="font-bold text-slate-700">
                {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-slate-400" />
            Productos Comprados
          </h4>
          <div className="rounded-xl border border-slate-100 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items?.map((item, index) => {
                  // 🔍 JOIN: Buscar el nombre del producto por su ID
                  const product = products.find((p) => p.id === item.product_id);
                  return (
                    <TableRow key={index} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700">
                            {product ? product.name : "Producto no encontrado"}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: {item.product_id.slice(0, 8)}...
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold text-xs">
                          {item.quantity} uds.
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center bg-blue-600 p-5 rounded-2xl shadow-lg shadow-blue-100">
          <div className="flex items-center gap-2 text-white/90 font-bold uppercase tracking-wider text-xs">
            <DollarSign className="h-5 w-5" />
            Total Cobrado
          </div>
          <span className="text-3xl font-black text-white">
            ${order.total?.toLocaleString()}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};