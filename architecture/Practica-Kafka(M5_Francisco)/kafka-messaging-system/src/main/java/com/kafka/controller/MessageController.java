package com.kafka.controller;

import com.kafka.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired
    private ProducerService producerService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendMessage(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El mensaje no puede estar vacío"));
        }

        String result = producerService.sendMessage(message);
        
        if (result.startsWith("Error")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", result));
        }
        
        return ResponseEntity.ok(Map.of("status", "success", "message", result));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "OK", "service", "Kafka Messaging System"));
    }

    // Endpoint adicional para compatibilidad con Postman
    @PostMapping("/send-text")
    public ResponseEntity<Map<String, String>> sendTextMessage(@RequestBody String message) {
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El mensaje no puede estar vacío"));
        }

        String result = producerService.sendMessage(message);
        
        if (result.startsWith("Error")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", result));
        }
        
        return ResponseEntity.ok(Map.of("status", "success", "message", result));
    }
}