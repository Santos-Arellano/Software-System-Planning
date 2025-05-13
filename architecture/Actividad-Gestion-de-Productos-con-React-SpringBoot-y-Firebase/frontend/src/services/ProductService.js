import axios from 'axios';

const API_URL = '/api/productos';

class ProductService {
  getAllProducts() {
    return axios.get(API_URL)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching products:', error);
        throw error;
      });
  }

  getProductById(id) {
    return axios.get(`${API_URL}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
      });
  }

  createProduct(product) {
    return axios.post(API_URL, product)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating product:', error);
        throw error;
      });
  }

  updateProduct(product) {
    return axios.put(`${API_URL}/${product.id}`, product)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error updating product with id ${product.id}:`, error);
        throw error;
      });
  }

  deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
      });
  }
}

export default new ProductService();