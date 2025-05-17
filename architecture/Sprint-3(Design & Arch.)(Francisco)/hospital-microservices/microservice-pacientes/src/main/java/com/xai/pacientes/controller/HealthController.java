///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/microservice-pacientes/src/main/java/com/xai/pacientes/controller/HealthController.java
package com.xai.pacientes.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Pacientes service is healthy");
    }
}
