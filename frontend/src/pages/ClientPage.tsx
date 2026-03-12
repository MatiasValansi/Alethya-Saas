import { useState } from 'react';
import { useClients } from '@/hooks/useClients';
import ClientForm from '@/components/clients/ClientForm';
import ClientTable from '@/components/clients/ClientTable';
import type { Client } from '@/types/client';

const TEMP_TENANT_ID = import.meta.env.VITE_TENANT_ID;

export const ClientPage = () => {
  const { clients, isLoading, error, addClient, updateClient, deleteClient } = useClients();
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  const handleClientSubmit = async (data: Client) => {
    if (editingClientId) await updateClient(editingClientId, data);
    else await addClient(data);
    cancelClientEdit();
  };

  const startEditingClient = (c: Client) => {
    setEditingClientId(c.id || null);
    setCurrentClient(c);
  };

  const cancelClientEdit = () => {
    setEditingClientId(null);
    setCurrentClient(null);
  };

  const handleDeleteClient = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        await deleteClient(id);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <ClientForm 
          initialData={currentClient || { dni: '', name: '', email: '', phone: '', address: '', tenant_id: TEMP_TENANT_ID }}
          isEditing={!!editingClientId}
          onSubmit={handleClientSubmit}
          onCancel={cancelClientEdit}
        />
      </div>
      <div className="lg:col-span-3">
        {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
        <ClientTable 
          clients={clients} 
          isLoading={isLoading} 
          onEdit={startEditingClient} 
          onDelete={handleDeleteClient} 
        />
      </div>
    </div>
  );
};