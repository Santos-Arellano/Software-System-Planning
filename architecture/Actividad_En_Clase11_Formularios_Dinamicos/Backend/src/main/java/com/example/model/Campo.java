///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Actividad_En_Clase11_Formularios_Dinamicos/Backend/src/main/java/com/example/model/Campo.java
package com.example.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Campo {
    private String id;
    private String tipo;
    private String etiqueta;
    private String placeholder;
    private boolean requerido;
    private String[] opciones;
}