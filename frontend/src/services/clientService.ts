import axios from 'axios';
import type { Client } from '../types/client';

const API_URL = `${import.meta.env.VITE_API_URL}/clients/`;
const TENANT_ID = import.meta.env.VITE_TENANT_ID;

export const clientService = {
  // Obtener todos los clientes del comercio
  getClients: async (): Promise<Client[]> => {
    const response = await axios.get(API_URL, {
      params: { tenant_id: TENANT_ID } 
    });
    return response.data;
  },

  // Crear un nuevo cliente
  createClient: async (clientData: Client): Promise<Client> => {
    // El tenant_id ya debería venir en el objeto, pero nos aseguramos
    const response = await axios.post(API_URL, clientData);
    return response.data;
  },

  // Actualizar un cliente 
  updateClient: async (id: string, clientData: Client): Promise<Client> => {
    const response = await axios.put(`${API_URL}${id}?tenant_id=${TENANT_ID}`, clientData);
    return response.data;
  },

  // Eliminar un cliente
  deleteClient: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}${id}?tenant_id=${TENANT_ID}`);
  }
};