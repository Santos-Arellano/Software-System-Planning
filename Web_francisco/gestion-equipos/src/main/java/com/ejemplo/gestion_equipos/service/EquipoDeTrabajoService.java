///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/service/EquipoDeTrabajoService.java
package com.ejemplo.gestionequipos.service;

import com.ejemplo.gestionequipos.dto.EquipoInput;
import com.ejemplo.gestionequipos.entity.EquipoDeTrabajo;
import com.ejemplo.gestionequipos.repository.EquipoDeTrabajoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EquipoDeTrabajoService {
    
    @Autowired
    private EquipoDeTrabajoRepository equipoRepository;
    
    public List<EquipoDeTrabajo> obtenerTodosLosEquipos() {
        return equipoRepository.findAllWithTrabajadores();
    }
    
    public Optional<EquipoDeTrabajo> obtenerEquipoPorId(Long id) {
        return equipoRepository.findByIdWithTrabajadores(id);
    }
    
    public EquipoDeTrabajo crearEquipo(EquipoInput equipoInput) {
        EquipoDeTrabajo equipo = new EquipoDeTrabajo(
            equipoInput.getNombre(),
            equipoInput.getProyecto(),
            equipoInput.getLider(),
            equipoInput.getFechaCreacion(),
            equipoInput.getDescripcion()
        );
        return equipoRepository.save(equipo);
    }
    
    public EquipoDeTrabajo actualizarEquipo(Long id, EquipoInput equipoInput) {
        Optional<EquipoDeTrabajo> equipoExistente = equipoRepository.findByIdWithTrabajadores(id);
        if (equipoExistente.isPresent()) {
            EquipoDeTrabajo equipo = equipoExistente.get();
            equipo.setNombre(equipoInput.getNombre());
            equipo.setProyecto(equipoInput.getProyecto());
            equipo.setLider(equipoInput.getLider());
            equipo.setFechaCreacion(equipoInput.getFechaCreacion());
            equipo.setDescripcion(equipoInput.getDescripcion());
            return equipoRepository.save(equipo);
        }
        throw new RuntimeException("Equipo no encontrado con ID: " + id);
    }
    
    public boolean eliminarEquipo(Long id) {
        if (equipoRepository.existsById(id)) {
            equipoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}