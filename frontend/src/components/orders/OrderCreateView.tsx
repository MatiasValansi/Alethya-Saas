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
    
    const existingIndex = items.findIndex(i => i.product_id === prod.id);
    if (existingIndex > -1) {
      const newItems = [...items];
      newItems[existingIndex].quantity += qty;
      setItems(newItems);
    } else {
      setItems([...items, { ...prod, quantity: qty, product_id: prod.id }]);
    }
    
    setCurrentProductId("");
    setQty(1);
  };

  const handleConfirm = async () => {
    if (!selectedClientId || items.length === 0) return;

    const formattedItems = items.map(item => ({
      product_id: item.product_id, 
      quantity: item.quantity
    }));

    const orderData = {
      client_id: selectedClientId,
      tenant_id: import.meta.env.VITE_TENANT_ID,
      items: formattedItems
    };

    await onSubmit(orderData);
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Button variant="ghost" onClick={onCancel}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al listado
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm h-fit">
            <div>
              <h3 className="font-bold mb-3 text-slate-700">1. Datos del Pedido</h3>
              <ClientSelector onSelect={setSelectedClientId} selectedClientId={selectedClientId} />
            </div>
            
            <div>
              <h3 className="font-bold mb-3 text-slate-700">2. Agregar Productos</h3>
              <ProductSelector onSelect={setCurrentProductId} selectedProductId={currentProductId} />
              <div className="flex gap-2 mt-3">
                  <input 
                    type="number" 
                    value={qty} 
                    onChange={e => setQty(Number(e.target.value))} 
                    className="border rounded-md p-2 w-20 text-center"
                    min={1}
                  />
                  <Button 
                    onClick={addItem} 
                    disabled={!currentProductId} 
                    className="flex-1 bg-slate-800"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Añadir
                  </Button>
              </div>
            </div>
        </div>

        <div className="lg:col-span-2 border rounded-xl p-6 bg-white shadow-sm">
          <h3 className="font-bold mb-4 text-slate-700">Resumen del Pedido</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-center">Cant.</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right font-bold">${(item.price * item.quantity).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Total a pagar</span>
              <span className="text-3xl font-black text-slate-900">${total.toLocaleString()}</span>
            </div>
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedClientId || items.length === 0}
              className="bg-green-600 hover:bg-green-700 px-8 h-12 text-lg"
            >
              <Send className="mr-2 h-5 w-5" /> Confirmar Pedido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};