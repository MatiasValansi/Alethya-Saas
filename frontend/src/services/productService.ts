import axios from 'axios';

const API_URL = "http://localhost:8080/products/";
const TENANT_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; // Esto luego vendrá de un login

export const productService = {
  // Obtener todos
  getProducts: async () => {
    const response = await axios.get(API_URL);
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