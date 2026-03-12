// frontend/src/components/ClientForm.tsx
import React, { useState, useEffect } from 'react';
import type { Client } from '../../types/client';

interface ClientFormProps {
  initialData: Client; // Nueva prop
  isEditing: boolean;  // Nueva prop
  onSubmit: (client: Client) => Promise<void>;
  onCancel: () => void; // Nueva prop
}

const ClientForm: React.FC<ClientFormProps> = ({ initialData, isEditing, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Client>(initialData);

  // EFECTO CRUCIAL: Si el Padre cambia el initialData (al hacer clic en editar), 
  // actualizamos los campos del formulario.
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 sticky top-4">
      <h3 className="text-lg font-bold mb-4 text-gray-700">
        {isEditing ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
      </h3>
      
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre Completo"
          className="border p-2 rounded focus:ring-2 focus:ring-[#bda28a]"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="DNI"
          className="border p-2 rounded focus:ring-2 focus:ring-[#bda28a]"
          value={formData.dni}
          onChange={(e) => setFormData({...formData, dni: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded focus:ring-2 focus:ring-[#bda28a]"
          value={formData.email || ''}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="text"
          placeholder="Teléfono"
          className="border p-2 rounded focus:ring-2 focus:ring-[#bda28a]"
          value={formData.phone || ''}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>

      <div className="flex gap-2 mt-6">
        <button type="submit" className="flex-1 bg-[#bda28a] text-white px-4 py-2 rounded font-bold hover:bg-[#a68d77] transition">
          {isEditing ? 'Actualizar' : 'Guardar'}
        </button>
        
        {isEditing && (
          <button 
            type="button" 
            onClick={onCancel}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded font-bold hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ClientForm;