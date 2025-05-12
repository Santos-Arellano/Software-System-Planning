///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Actividad_En_Clase11_Formularios_Dinamicos/Backend/src/main/java/com/example/factory/GuestFormularioFactory.java
package com.example.factory;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.model.Campo;
import com.example.model.Formulario;
import com.example.service.FirebaseService;

@Component
public class GuestFormularioFactory implements FormularioFactory {
    
    private static final String TIPO_USUARIO = "guest";
    private static final String TITULO_FORMULARIO = "Formulario de Invitado";
    
    @Autowired
    private FirebaseService firebaseService;
    
    @Override
    public Formulario crearFormulario() {
        // Obtenemos configuración desde Firebase
        List<Campo> camposFirebase = firebaseService.obtenerCamposFormulario(TIPO_USUARIO);
        
        // Si no hay datos en Firebase, usamos configuración por defecto
        if (camposFirebase == null || camposFirebase.isEmpty()) {
            List<Campo> campos = new ArrayList<>();
            
            Campo campoNombre = new Campo();
            campoNombre.setId("guest_nombre");
            campoNombre.setTipo("text");
            campoNombre.setEtiqueta("Nombre");
            campoNombre.setPlaceholder("Ingrese su nombre");
            campoNombre.setRequerido(true);
            campos.add(campoNombre);
            
            Campo campoEmail = new Campo();
            campoEmail.setId("guest_email");
            campoEmail.setTipo("email");
            campoEmail.setEtiqueta("Correo electrónico");
            campoEmail.setPlaceholder("ejemplo@correo.com");
            campoEmail.setRequerido(true);
            campos.add(campoEmail);
            
            Campo campoComentario = new Campo();
            campoComentario.setId("guest_comentario");
            campoComentario.setTipo("textarea");
            campoComentario.setEtiqueta("Comentario");
            campoComentario.setPlaceholder("Deje su comentario aquí");
            campoComentario.setRequerido(false);
            campos.add(campoComentario);
            
            Formulario formulario = new Formulario();
            formulario.setTipoUsuario(TIPO_USUARIO);
            formulario.setTitulo(TITULO_FORMULARIO);
            formulario.setCampos(campos);
            return formulario;
        }
        
        Formulario formulario = new Formulario();
        formulario.setTipoUsuario(TIPO_USUARIO);
        formulario.setTitulo(TITULO_FORMULARIO);
        formulario.setCampos(camposFirebase);
        return formulario;
    }
}