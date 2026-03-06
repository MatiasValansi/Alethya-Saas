import { useState } from 'react';
import type { Product } from './types/product';
import { useProducts } from './hooks/useProducts';
import { useClients } from './hooks/useClients'; // Importamos el cerebro de clientes
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import ClientForm from './components/ClientForm'; // Importamos la UI de clientes
import ClientTable from './components/ClientTable';
import type { Client } from './types/client';

const TEMP_TENANT_ID = import.meta.env.VITE_TENANT_ID;

function App() {
  // Hook de Productos 
  const { products, addProduct, updateProduct, deleteProduct, error: productError } = useProducts();
  
  // Hook de Clientes
  const { clients, isLoading: loadingClients, error: clientError, addClient, updateClient, deleteClient } = useClients();

  // Estado para navegar entre secciones
  const [activeTab, setActiveTab] = useState<'products' | 'clients'>('products');

  // Estados para edición 
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  // Lógica de Productos
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

  // Lógica de Clientes
  const handleClientSubmit = async (data: Client) => {
    if (editingClientId) {
      await updateClient(editingClientId, data);
    } else {
      await addClient(data);
    }
    cancelClientEdit();
  };

  const startEditingClient = (c: Client) => {
    setEditingClientId(c.id || null);
    setCurrentClient(c);
  };

  const cancelClientEdit = () => {
    setEditingClientId(null);
    setCurrentClient(null);
  };

  const handleDeleteClient = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        await deleteClient(id);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Estilo Alethya */}
        <header className="bg-[#bda28a] text-white p-8 rounded-xl shadow-lg text-center mb-10">
          <h1 className="text-5xl font-black tracking-widest uppercase">ALETHYA</h1>
          <p className="mt-2 text-sm opacity-80 italic">Luxury SaaS Management</p>
        </header>

        {/* Sistema de Tabs (Navegación) */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'products' ? 'bg-[#bda28a] text-white' : 'bg-white text-gray-500'}`}
          >
            Inventario
          </button>
          <button 
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'clients' ? 'bg-[#bda28a] text-white' : 'bg-white text-gray-500'}`}
          >
            Clientes
          </button>
        </div>

        {/* Sección de Productos */}
        {activeTab === 'products' && (
          <div className="animate-fadeIn">
            {productError && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded shadow-sm">{productError}</div>}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ProductForm 
                initialData={currentProduct || { name: '', description: '', price: 0, stock: 0, code: '', tenant_id: TEMP_TENANT_ID }}
                isEditing={!!editingId}
                onSubmit={handleProductSubmit}
                onCancel={cancelEdit}
              />
              <div className="lg:col-span-2">
                <ProductTable products={products} onEdit={startEditing} onDelete={deleteProduct} />
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN CLIENTES */}
        {activeTab === 'clients' && (
          <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ClientForm 
              initialData={currentClient || { dni: '', name: '', email: '', phone: '', address: '', tenant_id: TEMP_TENANT_ID }}
              isEditing={!!editingClientId}
              onSubmit={handleClientSubmit}
              onCancel={cancelClientEdit}
            />
            <div className="lg:col-span-2">
              <ClientTable 
                clients={clients} 
                isLoading={loadingClients} 
                onEdit={startEditingClient} 
                onDelete={handleDeleteClient} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;