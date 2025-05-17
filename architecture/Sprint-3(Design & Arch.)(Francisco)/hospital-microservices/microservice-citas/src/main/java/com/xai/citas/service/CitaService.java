package com.xai.citas.service;

import com.xai.citas.model.Cita;
import com.xai.citas.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CitaService {
    @Autowired
    private CitaRepository citaRepository;

    public List<Cita> getAllCitas() {
        return citaRepository.findAll();
    }

    public Cita saveCita(Cita cita) {
        return citaRepository.save(cita);
    }
}