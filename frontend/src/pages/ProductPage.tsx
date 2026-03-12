import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductForm from '@/components/products/ProductForm';
import ProductTable from '@/components/products/ProductTable';
import type { Product } from '@/types/product';
import { PackageSearch } from 'lucide-react';

const TEMP_TENANT_ID = import.meta.env.VITE_TENANT_ID;

export const ProductPage = () => {
  const { products, addProduct, updateProduct, deleteProduct, error } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<Product | null>(null);

  const handleSubmit = async (data: Product) => {
    if (editingId) await updateProduct(editingId, data);
    else await addProduct(data);
    cancelEdit();
  };

  const startEditing = (item: Product) => {
    setEditingId(item.id || null);
    setCurrentItem(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setCurrentItem(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <PackageSearch className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Inventario de Productos</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductForm 
            initialData={currentItem || { name: '', description: '', price: 0, stock: 0, code: '', tenant_id: TEMP_TENANT_ID }}
            isEditing={!!editingId}
            onSubmit={handleSubmit}
            onCancel={cancelEdit}
          />
        </div>
        <div className="lg:col-span-3">
          {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
          <ProductTable 
            products={products} 
            onEdit={startEditing} 
            onDelete={handleDelete} 
          />
        </div>
      </div>
    </div>
  );
};