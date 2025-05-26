///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/resolver/QueryResolver.java
package com.ejemplo.gestionequipos.resolver;

import com.ejemplo.gestionequipos.entity.EquipoDeTrabajo;
import com.ejemplo.gestionequipos.entity.Trabajador;
import com.ejemplo.gestionequipos.service.EquipoDeTrabajoService;
import com.ejemplo.gestionequipos.service.TrabajadorService;
import com.ejemplo.gestionequipos.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
public class QueryResolver {
    
    private final EquipoDeTrabajoService equipoService;
    private final TrabajadorService trabajadorService;

    @Autowired
    public QueryResolver(EquipoDeTrabajoService equipoService, TrabajadorService trabajadorService) {
        this.equipoService = equipoService;
        this.trabajadorService = trabajadorService;
    }
    
    @QueryMapping
    public List<EquipoDeTrabajo> equipos() {
        return equipoService.obtenerTodosLosEquipos();
    }
    
    @QueryMapping
    public EquipoDeTrabajo equipo(@Argument Long id) {
        return equipoService.obtenerEquipoPorId(id)
            .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
    }
    
    @QueryMapping
    public List<Trabajador> trabajadores() {
        return trabajadorService.obtenerTodosLosTrabajadores();
    }
    
    @QueryMapping
    public Trabajador trabajador(@Argument Long id) {
        return trabajadorService.obtenerTrabajadorPorId(id)
            .orElseThrow(() -> new ResourceNotFoundException("Worker not found with id: " + id));
    }
    
    @QueryMapping
    public List<Trabajador> trabajadoresPorEquipo(@Argument Long equipoId) {
        equipoService.obtenerEquipoPorId(equipoId)
            .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + equipoId));
        return trabajadorService.obtenerTrabajadoresPorEquipo(equipoId);
    }
}