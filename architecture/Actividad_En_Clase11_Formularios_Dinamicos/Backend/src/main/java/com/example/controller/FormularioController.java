///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Actividad_En_Clase11_Formularios_Dinamicos/Backend/src/main/java/com/example/controller/FormularioController.java
package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Formulario;
import com.example.service.FormularioService;

@RestController
@RequestMapping("/api/formularios")
@CrossOrigin(origins = "http://localhost:3000")
public class FormularioController {
    
    @Autowired
    private FormularioService formularioService;
    
    @GetMapping("/{tipoUsuario}")
    public ResponseEntity<Formulario> obtenerFormulario(@PathVariable String tipoUsuario) {
        try {
            Formulario formulario = formularioService.obtenerFormularioPorTipoUsuario(tipoUsuario);
            return ResponseEntity.ok(formulario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}