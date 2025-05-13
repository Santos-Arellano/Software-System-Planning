import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';
import ProductService from '../services/ProductService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await ProductService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOpenModal = () => {
    setCurrentProduct(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts(); // Refrescar la lista después de eliminar
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const saveProduct = async (product) => {
    try {
      if (isEditing) {
        await ProductService.updateProduct(product);
      } else {
        await ProductService.createProduct(product);
      }
      fetchProducts(); // Refrescar la lista después de guardar
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Gestión de Productos</h2>
        <Button 
          variant="primary" 
          className="add-button"
          onClick={handleOpenModal}
        >
          Agregar Producto
        </Button>
      </div>

      <ProductTable 
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <ProductModal 
        show={showModal}
        handleClose={handleCloseModal}
        product={currentProduct}
        saveProduct={saveProduct}
        isEditing={isEditing}
      />
    </div>
  );
};

export default ProductsPage;