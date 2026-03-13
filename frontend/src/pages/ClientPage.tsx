import { useState } from 'react';
import { useClients } from '@/hooks/useClients';
import ClientForm from '@/components/clients/ClientForm';
import { ClientTable } from '@/components/clients/ClientTable';
import type { Client } from '@/types/client';
import { Users } from 'lucide-react';

const TEMP_TENANT_ID = import.meta.env.VITE_TENANT_ID;

export const ClientPage = () => {
  const { clients, isLoading, error, addClient, updateClient, deleteClient } = useClients();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<Client | null>(null);

  const handleSubmit = async (data: Client) => {
    if (editingId) await updateClient(editingId, data);
    else await addClient(data);
    cancelEdit();
  };

  const startEditing = (item: Client) => {
    setEditingId(item.id || null);
    setCurrentItem(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setCurrentItem(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        await deleteClient(id);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Gestión de Clientes</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ClientForm 
            initialData={currentItem || { dni: '', name: '', email: '', phone: '', address: '', tenant_id: TEMP_TENANT_ID }}
            isEditing={!!editingId}
            onSubmit={handleSubmit}
            onCancel={cancelEdit}
          />
        </div>
        <div className="lg:col-span-3">
          {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
          <ClientTable 
            clients={clients} 
            isLoading={isLoading} 
            onEdit={startEditing} 
            onDelete={handleDelete} 
          />
        </div>
      </div>
    </div>
  );
};