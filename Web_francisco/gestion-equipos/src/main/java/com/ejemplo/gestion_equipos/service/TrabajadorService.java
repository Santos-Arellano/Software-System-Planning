///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/service/TrabajadorService.java
package com.ejemplo.gestionequipos.service;

import com.ejemplo.gestionequipos.dto.TrabajadorInput;
import com.ejemplo.gestionequipos.entity.EquipoDeTrabajo;
import com.ejemplo.gestionequipos.entity.Trabajador;
import com.ejemplo.gestionequipos.repository.EquipoDeTrabajoRepository;
import com.ejemplo.gestionequipos.repository.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TrabajadorService {
    
    @Autowired
    private TrabajadorRepository trabajadorRepository;
    
    @Autowired
    private EquipoDeTrabajoRepository equipoRepository;
    
    public List<Trabajador> obtenerTodosLosTrabajadores() {
        return trabajadorRepository.findAll();
    }
    
    public Optional<Trabajador> obtenerTrabajadorPorId(Long id) {
        return trabajadorRepository.findById(id);
    }
    
    public List<Trabajador> obtenerTrabajadoresPorEquipo(Long equipoId) {
        return trabajadorRepository.findByEquipoId(equipoId);
    }
    
    public Trabajador crearTrabajador(TrabajadorInput trabajadorInput) {
        Optional<EquipoDeTrabajo> equipo = equipoRepository.findById(trabajadorInput.getEquipoId());
        if (equipo.isPresent()) {
            Trabajador trabajador = new Trabajador(
                trabajadorInput.getNombre(),
                trabajadorInput.getApellido(),
                trabajadorInput.getRol(),
                trabajadorInput.getEmail(),
                equipo.get()
            );
            return trabajadorRepository.save(trabajador);
        }
        throw new RuntimeException("Equipo no encontrado con ID: " + trabajadorInput.getEquipoId());
    }
    
    public Trabajador actualizarTrabajador(Long id, TrabajadorInput trabajadorInput) {
        Optional<Trabajador> trabajadorExistente = trabajadorRepository.findById(id);
        if (trabajadorExistente.isPresent()) {
            Trabajador trabajador = trabajadorExistente.get();
            trabajador.setNombre(trabajadorInput.getNombre());
            trabajador.setApellido(trabajadorInput.getApellido());
            trabajador.setRol(trabajadorInput.getRol());
            trabajador.setEmail(trabajadorInput.getEmail());
            
            if (trabajadorInput.getEquipoId() != null) {
                Optional<EquipoDeTrabajo> equipo = equipoRepository.findById(trabajadorInput.getEquipoId());
                if (equipo.isPresent()) {
                    trabajador.setEquipo(equipo.get());
                }
            }
            
            return trabajadorRepository.save(trabajador);
        }
        throw new RuntimeException("Trabajador no encontrado con ID: " + id);
    }
    
    public boolean eliminarTrabajador(Long id) {
        if (trabajadorRepository.existsById(id)) {
            trabajadorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}