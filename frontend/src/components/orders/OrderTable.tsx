import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import type { Order } from "@/types/order";

interface OrderTableProps {
  orders: Order[];
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const OrderTable = ({ orders, onView, onDelete }: OrderTableProps) => {
  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id?.slice(-4)}</TableCell>
              <TableCell>{order.client_id}</TableCell> 
              <TableCell>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell className="text-right font-bold">${order.total?.toLocaleString()}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button variant="outline" size="icon" onClick={() => onView(order.id!)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => onDelete(order.id!)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};