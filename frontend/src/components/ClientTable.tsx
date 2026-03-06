import React from 'react';
import type { Client } from '../types/client';

interface ClientTableProps {
  clients: Client[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const ClientTable: React.FC<ClientTableProps> = ({ clients, onDelete, isLoading }) => {
  if (isLoading) {
    return <div className="p-4 text-center text-blue-500">Cargando clientes de Alethya...</div>;
  }

  if (clients.length === 0) {
    return <div className="p-4 text-center text-gray-500">No hay clientes registrados aún.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">DNI</th>
            <th className="py-3 px-6 text-left">Contacto</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {clients.map((client) => (
            <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium">{client.name}</span>
              </td>
              <td className="py-3 px-6 text-left">
                {client.dni}
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex flex-col">
                  <span className="text-xs text-blue-500">{client.email}</span>
                  <span className="text-xs text-gray-400">{client.phone}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <button 
                  onClick={() => client.id && onDelete(client.id)}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs hover:bg-red-200 transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;