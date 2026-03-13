import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Send, Plus, ArrowLeft } from 'lucide-react';
import { ClientSelector } from '../clients/ClientSelector';
import { ProductSelector } from '../products/ProductSelector';
import { useProducts } from '@/hooks/useProducts';

export const OrderCreateView = ({ onCancel, onSubmit }: { onCancel: () => void, onSubmit: (data: any) => Promise<void> }) => {
  const { products } = useProducts();
  const [selectedClientId, setSelectedClientId] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [currentProductId, setCurrentProductId] = useState("");
  const [qty, setQty] = useState(1);

  const addItem = () => {
    const prod = products.find(p => p.id === currentProductId);
    if (!prod) return;
    setItems([...items, { ...prod, quantity: qty, product_id: prod.id }]);
    setCurrentProductId("");
    setQty(1);
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onCancel}><ArrowLeft className="mr-2 h-4 w-4" /> Volver</Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
            <h3 className="font-bold">1. Datos del Pedido</h3>
            <ClientSelector onSelect={setSelectedClientId} selectedClientId={selectedClientId} />
            <h3 className="font-bold">2. Agregar Productos</h3>
            <ProductSelector onSelect={setCurrentProductId} selectedProductId={currentProductId} />
            <div className="flex gap-2">
                <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} className="border rounded p-2 w-20" />
                <Button onClick={addItem} disabled={!currentProductId} className="flex-1"><Plus className="h-4 w-4" /> Añadir</Button>
            </div>
        </div>
        <div className="lg:col-span-2 border rounded-xl p-4 bg-white">
          <Table>
            <TableHeader><TableRow><TableHead>Producto</TableHead><TableHead>Cant.</TableHead><TableHead>Subtotal</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="font-bold">${item.price * item.quantity}</TableCell>
                  <TableCell><Button variant="ghost" onClick={() => setItems(items.filter((_, idx) => idx !== i))}><Trash2 className="h-4 w-4 text-red-500" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center border-t pt-4">
            <span className="text-2xl font-black">Total: ${total}</span>
            <Button onClick={() => onSubmit({ client_id: selectedClientId, items })} className="bg-green-600">Confirmar Pedido</Button>
          </div>
        </div>
      </div>
    </div>
  );
};