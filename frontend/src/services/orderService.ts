// src/services/orderService.ts
import axios from 'axios';
import type { Order, CreateOrderDTO } from '../types/order';

// Usamos la misma estructura de constantes que en Client
const API_URL = `${import.meta.env.VITE_API_URL}/orders/`;
const TENANT_ID = import.meta.env.VITE_TENANT_ID;

export const orderService = {
  // Obtener todos los pedidos
  getOrders: async (): Promise<Order[]> => {
    const response = await axios.get(API_URL, {
      params: { tenant_id: TENANT_ID }
    });
    return response.data;
  },

  // Crear un nuevo pedido (Usando el DTO)
  createOrder: async (orderData: CreateOrderDTO): Promise<Order> => {
    // Aquí el tenant_id suele ir en el body si es un POST de creación
    const response = await axios.post(API_URL, orderData);
    return response.data;
  },

  // Actualizar un pedido
  updateOrder: async (id: string, orderData: Partial<CreateOrderDTO>): Promise<Order> => {
    const response = await axios.put(`${API_URL}${id}`, orderData, {
      params: { tenant_id: TENANT_ID }
    });
    return response.data;
  },

  // Eliminar un pedido
  deleteOrder: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}${id}`, {
      params: { tenant_id: TENANT_ID }
    });
  }
};