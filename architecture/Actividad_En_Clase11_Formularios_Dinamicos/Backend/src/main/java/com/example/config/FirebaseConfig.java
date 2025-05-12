package com.example.config;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {
    
    @PostConstruct
    public void initialize() {
        try {
            // Carga el archivo de configuración de servicio de Firebase
            InputStream serviceAccount = 
                    this.getClass().getResourceAsStream("/firebase-service-account.json");
            
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
            
            // Inicializar la aplicación si no existe
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase inicializado correctamente");
            }
            
        } catch (IOException e) {
            System.err.println("Error inicializando Firebase: " + e.getMessage());
        }
    }
}
