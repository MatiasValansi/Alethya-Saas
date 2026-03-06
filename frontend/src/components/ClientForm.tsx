import React, { useState } from 'react';
import { type Client } from '../types/client';

interface ClientFormProps {
  onSubmit: (client: Client) => Promise<void>;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {
  // Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    dni: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientData: Client = {
      ...formData,
      tenant_id: import.meta.env.VITE_TENANT_ID 
    };
    
    try {
      await onSubmit(clientData);
      setFormData({ dni: '', name: '', email: '', phone: '', address: '' }); // Limpiar
      alert("¡Cliente guardado con éxito!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-bold mb-4 text-gray-700">Registrar Nuevo Cliente</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre Completo"
          className="border p-2 rounded"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="DNI"
          className="border p-2 rounded"
          value={formData.dni}
          onChange={(e) => setFormData({...formData, dni: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email (Opcional)"
          className="border p-2 rounded"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="text"
          placeholder="Teléfono"
          className="border p-2 rounded"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Guardar Cliente
      </button>
    </form>
  );
};

export default ClientForm;