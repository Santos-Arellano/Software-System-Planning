///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Actividad_En_Clase11_Formularios_Dinamicos/Backend/src/main/java/com/example/factory/AdminFormularioFactory.java
package com.example.factory;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.model.Campo;
import com.example.model.Formulario;
import com.example.service.FirebaseService;

@Component
public class AdminFormularioFactory implements FormularioFactory {
    
    private static final String TIPO_USUARIO = "admin";
    private static final String TITULO_FORMULARIO = "Formulario de Administrador";
    
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
            campoNombre.setId("admin_nombre");
            campoNombre.setTipo("text");
            campoNombre.setEtiqueta("Nombre completo del administrador");
            campoNombre.setPlaceholder("Ingrese nombre completo");
            campoNombre.setRequerido(true);
            campos.add(campoNombre);
            
            Campo campoDepartamento = new Campo();
            campoDepartamento.setId("admin_departamento");
            campoDepartamento.setTipo("select");
            campoDepartamento.setEtiqueta("Departamento");
            campoDepartamento.setPlaceholder("Seleccione departamento");
            campoDepartamento.setRequerido(true);
            campoDepartamento.setOpciones(new String[]{"IT", "RRHH", "Finanzas", "Marketing", "Operaciones"});
            campos.add(campoDepartamento);
            
            Campo campoNivelAcceso = new Campo();
            campoNivelAcceso.setId("admin_nivel_acceso");
            campoNivelAcceso.setTipo("radio");
            campoNivelAcceso.setEtiqueta("Nivel de acceso");
            campoNivelAcceso.setPlaceholder("");
            campoNivelAcceso.setRequerido(true);
            campoNivelAcceso.setOpciones(new String[]{"Básico", "Intermedio", "Avanzado", "Total"});
            campos.add(campoNivelAcceso);
            
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