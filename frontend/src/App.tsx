import { useState } from 'react';
import type { Product } from './types/product';
import { useProducts } from './hooks/useProducts';
import ProductForm from './components/products/ProductForm';
import ProductTable from './components/products/ProductTable';
import { OrderListPage } from './pages/OrderListPage';

const TEMP_TENANT_ID = import.meta.env.VITE_TENANT_ID;

function App() {
  
  
  // Estado para navegar entre secciones
  const [activeTab, setActiveTab] = useState<'products' | 'clients'>('products');

  
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

       

       
        <div className="min-h-screen bg-slate-50/30">
        {/* Aquí podrías tener un Navbar global en el futuro */}
        <main className="py-6">
          <OrderListPage />
        </main>
      </div>
      </div>
    </div>
  );
}

export default App;