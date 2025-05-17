package com.xai.alertas.controller;

import com.xai.alertas.model.Alerta;
import com.xai.alertas.repository.AlertaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alertas")
public class AlertaController {

    @Autowired
    private AlertaRepository alertaRepository;

    @GetMapping
    public ResponseEntity<List<Alerta>> getAllAlertas() {
        return ResponseEntity.ok(alertaRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Alerta> createAlerta(@RequestBody Alerta alerta) {
        return ResponseEntity.ok(alertaRepository.save(alerta));
    }
}