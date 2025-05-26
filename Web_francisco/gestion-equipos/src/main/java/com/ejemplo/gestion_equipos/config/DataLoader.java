///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/config/DataLoader.java
package com.ejemplo.gestionequipos.config;

import com.ejemplo.gestionequipos.entity.EquipoDeTrabajo;
import com.ejemplo.gestionequipos.entity.Trabajador;
import com.ejemplo.gestionequipos.repository.EquipoDeTrabajoRepository;
import com.ejemplo.gestionequipos.repository.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private EquipoDeTrabajoRepository equipoRepository;

    @Autowired
    private TrabajadorRepository trabajadorRepository;

    @Override
    public void run(String... args) throws Exception {
        // Crear equipos de ejemplo
        EquipoDeTrabajo equipo1 = new EquipoDeTrabajo(
                "Equipo Frontend",
                "Sistema Web Corporativo",
                "Ana García",
                LocalDate.of(2024, 1, 15),
                "Equipo encargado del desarrollo frontend de la aplicación web"
        );

        EquipoDeTrabajo equipo2 = new EquipoDeTrabajo(
                "Equipo Backend",
                "API REST Microservicios",
                "Carlos López",
                LocalDate.of(2024, 2, 1),
                "Equipo responsable del desarrollo de APIs y microservicios"
        );

        equipoRepository.save(equipo1);
        equipoRepository.save(equipo2);

        // Crear trabajadores de ejemplo
        Trabajador trabajador1 = new Trabajador(
                "Juan",
                "Pérez",
                "Desarrollador Frontend",
                "juan.perez@empresa.com",
                equipo1
        );

        Trabajador trabajador2 = new Trabajador(
                "María",
                "González",
                "Diseñadora UX/UI",
                "maria.gonzalez@empresa.com",
                equipo1
        );

        Trabajador trabajador3 = new Trabajador(
                "Luis",
                "Martínez",
                "Desarrollador Backend",
                "luis.martinez@empresa.com",
                equipo2
        );

        trabajadorRepository.save(trabajador1);
        trabajadorRepository.save(trabajador2);
        trabajadorRepository.save(trabajador3);
    }
}