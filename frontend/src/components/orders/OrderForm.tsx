import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { OrderItem } from '@/types/order';
import { Plus, Send } from 'lucide-react';

export const OrderForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  // Estado local para los items que se están "armando"
  const [items, setItems] = useState<OrderItem[]>([]);
  const [currentProductId, setCurrentProductId] = useState("");
  const [currentQty, setCurrentQty] = useState(1);

  const addItem = () => {
    if (!currentProductId) return;
    setItems([...items, { product_id: currentProductId, quantity: currentQty }]);
    setCurrentProductId("");
    setCurrentQty(1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Datos del Pedido</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input placeholder="ID del Cliente" />
          <Input type="date" />
          <div className="flex gap-2">
            <Input 
              placeholder="ID Producto" 
              value={currentProductId} 
              onChange={(e) => setCurrentProductId(e.target.value)}
            />
            <Input 
              type="number" 
              className="w-20" 
              value={currentQty} 
              onChange={(e) => setCurrentQty(Number(e.target.value))}
            />
            <Button onClick={addItem} type="button" variant="secondary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Items Agregados */}
      <Card>
        <CardContent className="pt-6">
          <ul className="divide-y">
            {items.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span>Producto: {item.product_id}</span>
                <span>Cant: {item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
             <Button onClick={() => onSubmit({ items })} className="bg-green-600 hover:bg-green-700">
                <Send className="mr-2 h-4 w-4" /> Armar Pedido
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};