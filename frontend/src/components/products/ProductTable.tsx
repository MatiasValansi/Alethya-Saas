import React, { useState } from 'react';
import { Edit3, Trash2, Search, Package } from 'lucide-react';
import type { Product } from "@/types/product";
import { Input } from "@/components/ui/input";

interface ProductTableProps {
  products: Product[]; 
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica de filtrado: Buscamos coincidencia en Nombre o Código
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* BARRA DE BÚSQUEDA */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <Input
          placeholder="Buscar por prenda o código de barras..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 max-w-md border-slate-200 shadow-sm focus-visible:ring-blue-400"
        />
      </div>

      {/* CONTENEDOR DE LA TABLA */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Cód.</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Prenda</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Stock</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4 font-mono text-sm text-blue-600 font-bold">
                    {p.code}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-700">{p.name}</div>
                    <div className="text-xs text-slate-400 italic md:hidden">Stock: {p.stock}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      p.stock < 10 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {p.stock} UN.
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => onEdit(p)} 
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Editar"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => p.id && onDelete(p.id)} 
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Package className="h-10 w-10 opacity-20" />
                    <p>No se encontraron productos para "{searchTerm}"</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;