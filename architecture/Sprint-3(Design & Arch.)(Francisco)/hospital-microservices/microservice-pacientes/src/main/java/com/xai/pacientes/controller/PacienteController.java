///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/microservice-pacientes/src/main/java/com/xai/pacientes/controller/PacienteController.java
package com.xai.pacientes.controller;

import com.xai.pacientes.config.PacienteKafkaProducer;
import com.xai.pacientes.model.Paciente;
import com.xai.pacientes.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;
    
    @Autowired
    private PacienteKafkaProducer kafkaProducer;
    
    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Paciente>> getAllPacientes() {
        return ResponseEntity.ok(pacienteRepository.findAll());
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Paciente> createPaciente(@RequestBody Paciente paciente) {
        Paciente saved = pacienteRepository.save(paciente);
        kafkaProducer.sendPacienteUpdate("Paciente creado: " + paciente.getNombre());
        return ResponseEntity.ok(saved);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    public ResponseEntity<Paciente> getPacienteById(@PathVariable Long id) {
        return pacienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
