import React, { useState, useEffect } from 'react';
import { productService } from './services/productService';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';

function App() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  const loadProducts = async () => {
    const data = await productService.getProducts();
    setProducts(data);
  };

  useEffect(() => { loadProducts(); }, []);

  const handleFormSubmit = async (formData: any) => {
    if (editingId) {
      await productService.updateProduct(editingId, formData);
    } else {
      await productService.createProduct(formData);
    }
    cancelEdit();
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta prenda?")) {
      try {
        await productService.deleteProduct(id);
        loadProducts();
      } catch (error: any) {
        alert(error.response?.data?.detail || "Error al eliminar");
      }
    }
  };

  const startEditing = (p: any) => {
    setEditingId(p.id);
    setCurrentProduct(p);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setCurrentProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-[#bda28a] text-white p-6 rounded-t-lg text-center mb-8 shadow-md">
          <h1 className="text-4xl font-bold tracking-widest">ALETHYA</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductForm 
            initialData={currentProduct || { name: '', description: '', price: 0, stock: 0, code: '', tenant_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6" }}
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