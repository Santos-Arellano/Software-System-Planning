package com.xai.alertas.service;

import com.xai.alertas.model.Alerta;
import com.xai.alertas.repository.AlertaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlertaService {
    @Autowired
    private AlertaRepository alertaRepository;

    public List<Alerta> getAllAlertas() {
        return alertaRepository.findAll();
    }

    public Alerta saveAlerta(Alerta alerta) {
        return alertaRepository.save(alerta);
    }
}