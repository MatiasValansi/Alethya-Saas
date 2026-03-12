import React, { useState, useEffect } from 'react';
import { Save, PackagePlus, XCircle } from 'lucide-react';

interface ProductFormProps {
  initialData: any;
  isEditing: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, isEditing, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} 
      className={`bg-white p-6 rounded-xl shadow-xl border-t-8 transition-all duration-300 ${
        isEditing ? 'border-blue-500' : 'border-[#bda28a]'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditing ? 'Actualizar Prenda' : 'Añadir Prenda'}
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Código de Producto</label>
          <input 
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
            value={formData.code} 
            onChange={e => setFormData({...formData, code: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nombre de la Prenda</label>
          <input 
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
        </div>

        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Stock Disponible</label>
            <input 
              type="number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
              value={formData.stock} 
              onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Precio Unitario ($)</label>
            <input 
              type="number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
              value={formData.price} 
              onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} 
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" 
            className={`flex-1 py-4 rounded-lg font-black text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${
              isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {isEditing ? <Save size={20}/> : <PackagePlus size={20}/>}
            {isEditing ? 'CONFIRMAR CAMBIOS' : 'GUARDAR EN STOCK'}
          </button>
          
          {isEditing && (
            <button type="button" onClick={onCancel} className="bg-gray-100 p-4 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors">
              <XCircle size={24} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProductForm;