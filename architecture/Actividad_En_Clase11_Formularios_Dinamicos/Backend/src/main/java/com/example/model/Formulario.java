///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Actividad_En_Clase11_Formularios_Dinamicos/Backend/src/main/java/com/example/model/Formulario.java
package com.example.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formulario {
    private String tipoUsuario;
    private String titulo;
    private List<Campo> campos;
}

