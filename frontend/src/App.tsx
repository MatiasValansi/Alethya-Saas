import { useState } from 'react';
import { ClientPage } from '@/pages/ClientPage';
import { ProductPage } from '@/pages/ProductPage';
import { OrderListPage } from '@/pages/OrderListPage';

function App() {
  const [activeTab, setActiveTab] = useState<'products' | 'clients' | 'orders'>('orders');

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="bg-[#bda28a] text-white p-8 rounded-xl shadow-lg text-center mb-10">
          <h1 className="text-5xl font-black tracking-widest uppercase">ALETHYA</h1>
          <p className="mt-2 text-sm opacity-80 italic">Luxury SaaS Management</p>
        </header>

        <nav className="flex justify-center gap-4 mb-8">
          {['products', 'clients', 'orders'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-full font-bold transition capitalize ${
                activeTab === tab ? 'bg-[#bda28a] text-white' : 'bg-white text-gray-500 shadow-sm'
              }`}
            >
              {tab === 'products' ? 'Inventario' : tab === 'clients' ? 'Clientes' : 'Pedidos'}
            </button>
          ))}
        </nav>

        <main className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {activeTab === 'products' && <ProductPage />}
          {activeTab === 'clients' && <ClientPage />}
          {activeTab === 'orders' && <OrderListPage />}
        </main>
      </div>
    </div>
  );
}

export default App;