import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PackagePlus } from 'lucide-react';

// 1. Definimos la forma del producto para TypeScript
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
// Usamos el tenant_id que ya tienes en tu DB
const TEMP_TENANT_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; 

function App() {
  // 2. Le decimos a useState que manejará un array de tipo Product
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ 
    name: '', 
    description: '', 
    price: 0, 
    stock: 0, 
    code: '',
    tenant_id: TEMP_TENANT_ID
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get<Product[]>(API_URL);
      setProducts(res.data);
    } catch (error) {
      console.error("Error al traer productos:", error);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setForm({ name: '', description: '', price: 0, stock: 0, code: '', tenant_id: TEMP_TENANT_ID });
      fetchProducts();
    } catch (error) {
      alert("Error al guardar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#bda28a] text-white p-6 rounded-t-lg text-center mb-8 shadow-lg">
          <h1 className="text-4xl font-bold tracking-widest">ALETHYA</h1>
          <p className="mt-2 uppercase text-sm tracking-widest font-light">Software de Gestión - Beta</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulario inspirado en tu Java Swing */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#bda28a]">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Añadir Prenda</h2>
            <div className="space-y-4">
              <input 
                placeholder="Código (Ej: REM-001)" 
                className="w-full border p-2 rounded focus:ring-2 focus:ring-[#bda28a] outline-none" 
                value={form.code} 
                onChange={e => setForm({...form, code: e.target.value})} 
              />
              <input 
                placeholder="Nombre de la prenda" 
                className="w-full border p-2 rounded focus:ring-2 focus:ring-[#bda28a] outline-none" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
              />
              <textarea 
                placeholder="Descripción / Talles" 
                className="w-full border p-2 rounded focus:ring-2 focus:ring-[#bda28a] outline-none" 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
              />
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-xs text-gray-500 uppercase">Stock</label>
                  <input type="number" className="w-full border p-2 rounded" value={form.stock} onChange={e => setForm({...form, stock: parseInt(e.target.value) || 0})} />
                </div>
                <div className="w-1/2">
                  <label className="text-xs text-gray-500 uppercase">Precio $</label>
                  <input type="number" className="w-full border p-2 rounded" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value) || 0})} />
                </div>
              </div>
              <button className="w-full bg-[#bda28a] text-white py-3 rounded font-bold hover:bg-[#a68d77] transition-all flex items-center justify-center gap-2">
                <PackagePlus size={20} /> GUARDAR PRODUCTO
              </button>
            </div>
          </form>

          {/* Tabla inspirada en tu Java Swing */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Cód.</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Prenda</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Stock</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-orange-50/30 transition-colors">
                      <td className="p-4 font-mono text-sm text-blue-600 font-bold">{p.code}</td>
                      <td className="p-4">
                        <div className="font-bold text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.description}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-sm font-bold ${p.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {p.stock} un.
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-700">${p.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;