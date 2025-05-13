package com.example.gestionproductos.service;

import com.example.gestionproductos.model.Producto;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface ProductoService {
    List<Producto> getAllProductos() throws ExecutionException, InterruptedException;
    
    Producto getProductoById(String id) throws ExecutionException, InterruptedException;
    
    Producto saveProducto(Producto producto) throws ExecutionException, InterruptedException;
    
    Producto updateProducto(Producto producto) throws ExecutionException, InterruptedException;
    
    void deleteProducto(String id) throws ExecutionException, InterruptedException;
}