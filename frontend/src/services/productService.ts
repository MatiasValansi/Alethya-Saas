import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/products/`;
const TENANT_ID = import.meta.env.VITE_TENANT_ID;

export const productService = {
  // Obtener todos
  getProducts: async () => {
    const response = await axios.get(API_URL, {
      params: { tenant_id: TENANT_ID } 
    });
    return response.data;
  },

  // Crear
  createProduct: async (productData: any) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
  },

  // Actualizar
  updateProduct: async (id: string, productData: any) => {
    const response = await axios.put(`${API_URL}${id}`, productData);
    return response.data;
  },

  // ELIMINAR 
  deleteProduct: async (id: string) => {
    const response = await axios.delete(`${API_URL}${id}?tenant_id=${TENANT_ID}`);
    return response.data;
  }
};