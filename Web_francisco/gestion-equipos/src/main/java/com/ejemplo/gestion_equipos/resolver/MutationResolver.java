///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/resolver/MutationResolver.java
package com.ejemplo.gestionequipos.resolver;

import com.ejemplo.gestionequipos.dto.EquipoInput;
import com.ejemplo.gestionequipos.dto.TrabajadorInput;
import com.ejemplo.gestionequipos.entity.EquipoDeTrabajo;
import com.ejemplo.gestionequipos.entity.Trabajador;
import com.ejemplo.gestionequipos.service.EquipoDeTrabajoService;
import com.ejemplo.gestionequipos.service.TrabajadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class MutationResolver {
    
    @Autowired
    private EquipoDeTrabajoService equipoService;
    
    @Autowired
    private TrabajadorService trabajadorService;
    
    // Mutaciones para equipos
    @MutationMapping
    public EquipoDeTrabajo crearEquipo(@Argument EquipoInput input) {
        return equipoService.crearEquipo(input);
    }
    
    @MutationMapping
    public EquipoDeTrabajo actualizarEquipo(@Argument Long id, @Argument EquipoInput input) {
        return equipoService.actualizarEquipo(id, input);
    }
    
    @MutationMapping
    public Boolean eliminarEquipo(@Argument Long id) {
        return equipoService.eliminarEquipo(id);
    }
    
    // Mutaciones para trabajadores
    @MutationMapping
    public Trabajador crearTrabajador(@Argument TrabajadorInput input) {
        return trabajadorService.crearTrabajador(input);
    }
    
    @MutationMapping
    public Trabajador actualizarTrabajador(@Argument Long id, @Argument TrabajadorInput input) {
        return trabajadorService.actualizarTrabajador(id, input);
    }
    
    @MutationMapping
    public Boolean eliminarTrabajador(@Argument Long id) {
        return trabajadorService.eliminarTrabajador(id);
    }
}