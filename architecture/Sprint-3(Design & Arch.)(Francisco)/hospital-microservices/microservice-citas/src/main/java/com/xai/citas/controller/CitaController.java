///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/microservice-citas/src/main/java/com/xai/citas/controller/CitaController.java
package com.xai.citas.controller;

import com.xai.citas.config.CitaKafkaProducer;
import com.xai.citas.model.Cita;
import com.xai.citas.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/citas")
public class CitaController {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private CitaKafkaProducer kafkaProducer;

    @GetMapping
    public ResponseEntity<List<Cita>> getAllCitas() {
        return ResponseEntity.ok(citaRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Cita> createCita(@RequestBody Cita cita) {
        Cita saved = citaRepository.save(cita);
        kafkaProducer.sendCitaUpdate("Nueva cita para " + cita.getPaciente() + " con " + cita.getDoctor());
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/public/status")
    public ResponseEntity<String> getPublicStatus() {
        return ResponseEntity.ok("Citas service is publicly accessible");
    }
}