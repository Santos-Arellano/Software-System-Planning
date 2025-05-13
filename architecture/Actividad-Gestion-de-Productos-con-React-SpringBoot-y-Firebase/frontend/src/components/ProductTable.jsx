import React from 'react';
import { Button, Table } from 'react-bootstrap';

const ProductTable = ({ products, handleEdit, handleDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.nombre}</td>
              <td>{product.stock}</td>
              <td>${product.precio.toFixed(2)}</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="btn-action"
                  onClick={() => handleEdit(product)}
                >
                  Actualizar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="btn-action"
                  onClick={() => handleDelete(product.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No hay productos disponibles
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ProductTable;