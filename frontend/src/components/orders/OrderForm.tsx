import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, ShoppingCart, PlusCircle, Send } from 'lucide-react';
import { ClientSelector } from '../clients/ClientSelector';
import { ProductSelector } from '../products/ProductSelector';
import type { OrderItem, CreateOrderDTO } from '@/types/order';
import { useProducts } from '@/hooks/useProducts';

interface OrderFormProps {
  onSubmit: (data: CreateOrderDTO) => Promise<void>;
}

const TEMP_TENANT_ID = import.meta.env.VITE_TENANT_ID;

export const OrderForm = ({ onSubmit }: OrderFormProps) => {
  const { products } = useProducts();
  
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [items, setItems] = useState<(OrderItem & { name: string, price: number })[]>([]);
  
  const [currentProductId, setCurrentProductId] = useState<string>("");
  const [currentQty, setCurrentQty] = useState<number>(1);

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [items]);

  const handleAddItem = () => {
    const product = products.find(p => p.id === currentProductId);
    if (!product || currentQty <= 0) return;

    const existingItemIndex = items.findIndex(i => i.product_id === currentProductId);
    if (existingItemIndex > -1) {
      const newItems = [...items];
      newItems[existingItemIndex].quantity += currentQty;
      setItems(newItems);
    } else {
      setItems([...items, { 
        product_id: product.id!, 
        quantity: currentQty, 
        name: product.name, 
        price: product.price 
      }]);
    }
    
    setCurrentProductId("");
    setCurrentQty(1);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = async () => {
    if (!selectedClientId || items.length === 0) {
      alert("Debes seleccionar un cliente y al menos un producto.");
      return;
    }

    const orderData: CreateOrderDTO = {
      client_id: selectedClientId,
      tenant_id: TEMP_TENANT_ID,
      items: items.map(({ product_id, quantity }) => ({ product_id, quantity }))
    };

    try {
      await onSubmit(orderData);
      setItems([]);
      setSelectedClientId("");
    } catch (error) {
      console.error("Error al crear el pedido");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            Nuevo Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          
          {/* SELECCIÓN DE CLIENTE */}
          <div className="space-y-2">
            <Label>Cliente</Label>
            <ClientSelector 
              selectedClientId={selectedClientId} 
              onSelect={setSelectedClientId} 
            />
          </div>

          <hr className="my-4" />

          {/* AGREGAR PRODUCTOS */}
          <div className="space-y-4">
            <Label>Añadir Productos</Label>
            <div className="flex flex-col gap-3">
              <ProductSelector onSelect={setCurrentProductId} />
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  min="1" 
                  value={currentQty} 
                  onChange={(e) => setCurrentQty(Number(e.target.value))}
                  className="w-24"
                />
                <Button 
                  type="button" 
                  onClick={handleAddItem} 
                  disabled={!currentProductId}
                  className="flex-1 bg-slate-800 hover:bg-slate-900"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Agregar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RESUMEN DE COMPRA */}
      {items.length > 0 && (
        <Card className="animate-in fade-in slide-in-from-top-2 duration-300">
          <CardContent className="pt-6">
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm border-b pb-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-slate-500">x{item.quantity} - ${item.price} c/u</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">${item.price * item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeItem(idx)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-black text-blue-700">${total.toLocaleString()}</span>
              </div>

              <Button 
                onClick={handleFinalSubmit} 
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-bold mt-4"
              >
                <Send className="mr-2 h-5 w-5" /> Armar Pedido
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};