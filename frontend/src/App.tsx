import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit3, Trash2 } from 'lucide-react';
import ProductForm from './components/ProductForm';

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  code: string;
  tenant_id: string;
}

const API_URL = "http://localhost:8080/products/";
const TEMP_TENANT_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; 

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get<Product[]>(API_URL);
      setProducts(res.data);
    } catch (error) {
      console.error("Error al traer productos:", error);
    }
  };

  useEffect(() => { fetchProducts(); }, []);


  const handleFormSubmit = async (data: Product) => {
    try {
      if (editingId) {
        await axios.put(`${API_URL}${editingId}`, data);
      } else {
        await axios.post(API_URL, data);
      }
      cancelEdit(); 
      fetchProducts(); 
    } catch (error) {
      alert("Error en la operación de base de datos");
    }
  };

  const startEditing = (p: Product) => {
    setEditingId(p.id || null);
    setCurrentProduct(p); 
  };

  const cancelEdit = () => {
    setEditingId(null);
    setCurrentProduct(null);
  };

  // Función temporal para eliminar un producto, aún no implementada en el backend
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Eliminar esta prenda?")) {
      await axios.delete(`${API_URL}${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#bda28a] text-white p-6 rounded-t-lg text-center mb-8 shadow-md">
          <h1 className="text-4xl font-bold tracking-widest uppercase">ALETHYA</h1>
          <p className="mt-1 text-xs opacity-80 tracking-widest">SISTEMA DE GESTIÓN V2.0</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductForm 
            initialData={currentProduct || { name: '', description: '', price: 0, stock: 0, code: '', tenant_id: TEMP_TENANT_ID }}
            isEditing={!!editingId}
            onSubmit={handleFormSubmit}
            onCancel={cancelEdit}
          />

          <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Cód.</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Prenda</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Stock</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-orange-50/20 transition-colors">
                    <td className="p-4 font-mono text-blue-600 font-bold">{p.code}</td>
                    <td className="p-4 font-bold text-gray-700">{p.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${p.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {p.stock} UN.
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => startEditing(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => p.id && handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;