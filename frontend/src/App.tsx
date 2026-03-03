import React, { useState } from 'react';
import type { Product } from './types/product';
import { useProducts } from './hooks/useProducts';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';

const TEMP_TENANT_ID = import.meta.env.VITE_TENANT_ID;

function App() {
  // 1. Usamos nuestro "Cerebro" (Hook)
  const { products, addProduct, updateProduct, deleteProduct, error } = useProducts();

  // 2. Estados solo para la UI (Edición)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleFormSubmit = async (data: Product) => {
    if (editingId) {
      await updateProduct(editingId, data);
    } else {
      await addProduct(data);
    }
    cancelEdit();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Eliminar prenda?")) {
      try {
        await deleteProduct(id);
      } catch (err: any) {
        alert(err.message);
      }
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

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="bg-[#bda28a] text-white p-8 rounded-xl shadow-lg text-center mb-10">
          <h1 className="text-5xl font-black tracking-widest uppercase">ALETHYA</h1>
        </header>

        {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProductForm 
            initialData={currentProduct || { name: '', description: '', price: 0, stock: 0, code: '', tenant_id: TEMP_TENANT_ID }}
            isEditing={!!editingId}
            onSubmit={handleFormSubmit}
            onCancel={cancelEdit}
          />

          <ProductTable 
            products={products}
            onEdit={startEditing}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;