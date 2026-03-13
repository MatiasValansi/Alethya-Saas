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
import { Package, Calendar, User, DollarSign } from "lucide-react";

interface OrderDetailDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailDialog = ({ order, isOpen, onClose }: OrderDetailDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            Detalle del Pedido #{order.id?.slice(-6)}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 my-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Cliente ID:</span>
            <span className="text-slate-600 truncate">{order.client_id}</span>
          </div>
          <div className="flex items-center gap-2 text-sm justify-end">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Fecha:</span>
            <span className="text-slate-600">
              {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-bold text-slate-900 mb-3">Productos Comprados</h4>
          <div className="rounded-md border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Producto ID</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-xs text-slate-500">
                      {item.product_id}
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-700">
                      {item.quantity} uds.
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 text-blue-700 font-bold">
            <DollarSign className="h-5 w-5" />
            Total del Pedido
          </div>
          <span className="text-2xl font-black text-blue-800">
            ${order.total?.toLocaleString()}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};