///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Actividad_En_Clase11_Formularios_Dinamicos/Backend/src/main/java/com/example/service/FirebaseService.java
package com.example.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.example.model.Campo;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class FirebaseService {

    public List<Campo> obtenerCamposFormulario(String tipoUsuario) {
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            
            // Obtener configuración del formulario según tipo de usuario
            ApiFuture<QuerySnapshot> future = firestore.collection("formularios")
                    .whereEqualTo("tipoUsuario", tipoUsuario)
                    .get();
            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            if (!documents.isEmpty()) {
                DocumentSnapshot document = documents.get(0);
                
                @SuppressWarnings("unchecked")
                List<Object> camposRaw = (List<Object>) document.get("campos");
                
                if (camposRaw != null) {
                    List<Campo> campos = new ArrayList<>();
                    
                    for (Object campoRaw : camposRaw) {
                        @SuppressWarnings("unchecked")
                        java.util.Map<String, Object> campoMap = (java.util.Map<String, Object>) campoRaw;
                        
                        Campo campo = new Campo();
                        campo.setId((String) campoMap.get("id"));
                        campo.setTipo((String) campoMap.get("tipo"));
                        campo.setEtiqueta((String) campoMap.get("etiqueta"));
                        campo.setPlaceholder((String) campoMap.get("placeholder"));
                        campo.setRequerido((boolean) campoMap.get("requerido"));
                        
                        @SuppressWarnings("unchecked")
                        List<String> opcionesList = (List<String>) campoMap.get("opciones");
                        String[] opciones = null;
                        
                        if (opcionesList != null) {
                            opciones = opcionesList.toArray(new String[0]);
                        }
                        campo.setOpciones(opciones);
                        
                        campos.add(campo);
                    }
                    
                    return campos;
                }
            }
            
            return new ArrayList<>();
            
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}