import React, { useState, useEffect } from 'react';
import { PackagePlus, XCircle, Save } from 'lucide-react';

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
      className={`bg-white p-6 rounded-lg shadow-md border-t-4 transition-all ${isEditing ? 'border-blue-500' : 'border-[#bda28a]'}`}
    >
      <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Prenda' : 'Nueva Prenda'}</h2>
      
      <div className="space-y-4">
        <input 
          placeholder="Código" 
          className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-200"
          value={formData.code} 
          onChange={e => setFormData({...formData, code: e.target.value})} 
        />
        <input 
          placeholder="Nombre" 
          className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-200"
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
        />
        
        
        <div className="flex gap-2 pt-2">
          <button type="submit" className={`flex-1 py-3 rounded font-bold text-white transition flex items-center justify-center gap-2 ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#bda28a] hover:bg-[#a68d77]'}`}>
            {isEditing ? <Save size={18}/> : <PackagePlus size={18}/>}
            {isEditing ? 'ACTUALIZAR' : 'GUARDAR'}
          </button>
          
          {isEditing && (
            <button type="button" onClick={onCancel} className="bg-gray-200 p-3 rounded text-gray-600 hover:bg-gray-300">
              <XCircle size={20} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProductForm;