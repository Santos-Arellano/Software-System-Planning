///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Actividad_En_Clase11_Formularios_Dinamicos/Backend/src/main/java/com/example/service/FormularioService.java
package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.factory.AdminFormularioFactory;
import com.example.factory.FormularioFactory;
import com.example.factory.GuestFormularioFactory;
import com.example.model.Formulario;

@Service
public class FormularioService {
    
    @Autowired
    private AdminFormularioFactory adminFactory;
    
    @Autowired
    private GuestFormularioFactory guestFactory;
    
    public Formulario obtenerFormularioPorTipoUsuario(String tipoUsuario) {
        FormularioFactory factory;
        
        switch (tipoUsuario.toLowerCase()) {
            case "admin":
                factory = adminFactory;
                break;
            case "guest":
                factory = guestFactory;
                break;
            default:
                throw new IllegalArgumentException("Tipo de usuario no soportado: " + tipoUsuario);
        }
        
        return factory.crearFormulario();
    }
}