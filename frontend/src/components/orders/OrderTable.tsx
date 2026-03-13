import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, User } from "lucide-react";
import type { Order } from "@/types/order";
import { useClients } from "@/hooks/useClients"; // 1. Importamos el hook

interface OrderTableProps {
  orders: Order[];
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const OrderTable = ({ orders, onView, onDelete }: OrderTableProps) => {
  const { clients } = useClients(); // Cargamos los clientes

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            // 🔍 LÓGICA DEL JOIN:
            // Buscamos el objeto cliente que coincida con el ID del pedido
            const client = clients.find(c => c.id === order.client_id);
            
            // Si lo encuentra, usamos el nombre. 
            // Si no (porque está cargando), mostramos un pedacito del ID para que no quede feo
            const displayName = client ? client.name : `Cargando (${order.client_id.slice(0, 8)}...)`;

            return (
              <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-mono text-xs text-slate-400">
                  #{order.id?.slice(-5).toUpperCase()}
                </TableCell>
                
                {/* 🎯 ACÁ ESTÁ EL TRUCO: Usamos displayName, NO order.client_id */}
                <TableCell className="font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-slate-400" />
                    {displayName} 
                  </div>
                </TableCell>

                <TableCell className="text-slate-500">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell className="text-right font-black text-slate-900">
                  ${order.total?.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onView(order.id!)}>
                      <Eye className="h-4 w-4 text-slate-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(order.id!)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};