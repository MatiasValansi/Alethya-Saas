import { useState, useEffect } from 'react';
import type { Order, CreateOrderDTO } from '../types/order';
import { orderService } from '../services/orderService';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError("No pudimos cargar los pedidos.");
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = async (orderData: CreateOrderDTO) => {
    try {
      await orderService.createOrder(orderData);
      await loadOrders();
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || "Error al crear el pedido");
    }
  };

  const updateOrder = async (id: string, orderData: Partial<CreateOrderDTO>) => {
    try {
      await orderService.updateOrder(id, orderData);
      await loadOrders();
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || "Error al actualizar el pedido");
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await orderService.deleteOrder(id);
      await loadOrders();
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || "Error al eliminar el pedido");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return { 
    orders, 
    isLoading, 
    error, 
    loadOrders,
    addOrder, 
    updateOrder, 
    deleteOrder 
  };
};