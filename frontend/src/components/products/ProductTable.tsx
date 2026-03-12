import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

interface ProductTableProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  return (
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
                <button onClick={() => onEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded" title="Editar">
                  <Edit3 size={18} />
                </button>
                <button onClick={() => p.id && onDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded" title="Eliminar">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;