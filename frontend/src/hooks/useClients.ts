import { useState, useEffect } from 'react';
import type { Client } from '../types/client';
import { clientService } from '../services/clientService';

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadClients = async () => {
    setIsLoading(true); 
    try {
      const data = await clientService.getClients();
      setClients(data);
      setError(null);
    } catch (err) {
      setError("No pudimos cargar los clientes.");
    } finally {
      setIsLoading(false); 
    }
  };

  const addClient = async (client: Client) => {
    await clientService.createClient(client);
    await loadClients();
  };

  const updateClient = async (id: string, client: Client) => {
    await clientService.updateClient(id, client);
    await loadClients(); 
  };

  const deleteClient = async (id: string) => {
    try {
      await clientService.deleteClient(id);
      await loadClients(); 
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || "Error al eliminar el cliente");
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  return { clients, isLoading, error, addClient, updateClient, deleteClient };
};