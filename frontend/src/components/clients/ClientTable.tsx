// frontend/src/components/ClientTable.tsx
import React from 'react';
import type { Client } from '../../types/client';

interface ClientTableProps {
  clients: Client[];
  isLoading: boolean;
  onEdit: (client: Client) => void; // Nueva prop
  onDelete: (id: string) => Promise<void>;
}

const ClientTable: React.FC<ClientTableProps> = ({ clients, isLoading, onEdit, onDelete }) => {
  if (isLoading) return <div className="text-center py-10 text-gray-400">Cargando clientes...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-bold text-gray-600">Nombre / DNI</th>
            <th className="p-4 text-sm font-bold text-gray-600">Contacto</th>
            <th className="p-4 text-sm font-bold text-gray-600 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">
                <div className="font-bold text-gray-800">{client.name}</div>
                <div className="text-xs text-gray-400">{client.dni}</div>
              </td>
              <td className="p-4">
                <div className="text-sm text-blue-500">{client.email || '-'}</div>
                <div className="text-xs text-gray-400">{client.phone || '-'}</div>
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button 
                    onClick={() => onEdit(client)} // Usamos la nueva prop
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Editar"
                  >
                    ✎
                  </button>
                  <button 
                    onClick={() => client.id && onDelete(client.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Eliminar"
                  >
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;