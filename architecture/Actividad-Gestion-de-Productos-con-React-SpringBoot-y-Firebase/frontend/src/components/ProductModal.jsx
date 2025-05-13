import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductModal = ({ show, handleClose, product, saveProduct, isEditing }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    stock: 0,
    precio: 0
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: '',
        nombre: '',
        stock: 0,
        precio: 0
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'nombre' ? value : Number(value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProduct(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control 
              type="number" 
              name="stock" 
              value={formData.stock} 
              onChange={handleChange} 
              required 
              min="0" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control 
              type="number" 
              name="precio" 
              value={formData.precio} 
              onChange={handleChange} 
              required 
              min="0" 
              step="0.01" 
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;