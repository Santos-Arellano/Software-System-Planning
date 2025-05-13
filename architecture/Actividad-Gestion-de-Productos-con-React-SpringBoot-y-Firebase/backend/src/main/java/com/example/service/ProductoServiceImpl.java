///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Actividad-Gestion-de-Productos-con-React-SpringBoot-y-Firebase/backend/src/main/java/com/example/service/ProductoServiceImpl.java
package com.example.gestionproductos.service;

import com.example.gestionproductos.model.Producto;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class ProductoServiceImpl implements ProductoService {

    private static final String COLLECTION_NAME = "productos";

    @Override
    public List<Producto> getAllProductos() throws ExecutionException, InterruptedException {
        List<Producto> productosList = new ArrayList<>();
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
        
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            Producto producto = document.toObject(Producto.class);
            producto.setId(document.getId());
            productosList.add(producto);
        }
        
        return productosList;
    }

    @Override
    public Producto getProductoById(String id) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            Producto producto = document.toObject(Producto.class);
            producto.setId(document.getId());
            return producto;
        } else {
            return null;
        }
    }

    @Override
    public Producto saveProducto(Producto producto) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        
        // Generar un ID si no existe
        if (producto.getId() == null || producto.getId().isEmpty()) {
            producto.setId(UUID.randomUUID().toString());
        }
        
        ApiFuture<WriteResult> future = firestore.collection(COLLECTION_NAME)
                .document(producto.getId())
                .set(producto);
        
        future.get(); // Esperar a que la operación termine
        return producto;
    }

    @Override
    public Producto updateProducto(Producto producto) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        
        // Verificar si el producto existe
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(producto.getId());
        ApiFuture<DocumentSnapshot> futureGet = docRef.get();
        DocumentSnapshot document = futureGet.get();
        
        if (!document.exists()) {
            return null;
        }
        
        ApiFuture<WriteResult> futureUpdate = docRef.set(producto);
        futureUpdate.get(); // Esperar a que la operación termine
        
        return producto;
    }

    @Override
    public void deleteProducto(String id) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        
        // Verificar si el producto existe
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> futureGet = docRef.get();
        DocumentSnapshot document = futureGet.get();
        
        if (document.exists()) {
            ApiFuture<WriteResult> futureDelete = docRef.delete();
            futureDelete.get(); // Esperar a que la operación termine
        }
    }
}