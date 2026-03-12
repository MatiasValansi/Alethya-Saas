import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductForm from '@/components/products/ProductForm';
import ProductTable from '@/components/products/ProductTable';
import type { Product } from '@/types/product';

const TEMP_TENANT_ID = import.meta.env.VITE_TENANT_ID;

export const ProductPage = () => {
  const { products, addProduct, updateProduct, deleteProduct, error } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleProductSubmit = async (data: Product) => {
    if (editingId) await updateProduct(editingId, data);
    else await addProduct(data);
    cancelEdit();
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
    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <ProductForm 
          initialData={currentProduct || { name: '', description: '', price: 0, stock: 0, code: '', tenant_id: TEMP_TENANT_ID }}
          isEditing={!!editingId}
          onSubmit={handleProductSubmit}
          onCancel={cancelEdit}
        />
      </div>
      <div className="lg:col-span-3">
        {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
        <ProductTable products={products} onEdit={startEditing} onDelete={deleteProduct} />
      </div>
    </div>
  );
};