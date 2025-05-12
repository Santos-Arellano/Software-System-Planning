///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Actividad_En_Clase11_Formularios_Dinamicos/Backend/src/main/java/com/example/factory/FormularioFactory.java
package com.example.factory;

import com.example.model.Formulario;

// Interfaz abstracta para la fábrica de formularios
public interface FormularioFactory {
    Formulario crearFormulario();
}