import { useState, useEffect } from 'react';
import type { Product } from '../types/product';
import { productService } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("No pudimos cargar los productos.");
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    await productService.createProduct(product);
    await loadProducts();
  };

  const updateProduct = async (id: string, product: Product) => {
    await productService.updateProduct(id, product);
    await loadProducts();
  };

  const deleteProduct = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      await loadProducts();
    } catch (err: any) {
      // Aquí capturamos el error de "mucho stock" de tu Backend
      throw new Error(err.response?.data?.detail || "Error al eliminar");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, isLoading, error, addProduct, updateProduct, deleteProduct };
};