///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/repository/TrabajadorRepository.java
package com.ejemplo.gestionequipos.repository;

import com.ejemplo.gestionequipos.entity.Trabajador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrabajadorRepository extends JpaRepository<Trabajador, Long> {
    
    @Query("SELECT t FROM Trabajador t WHERE t.equipo.id = :equipoId")
    List<Trabajador> findByEquipoId(@Param("equipoId") Long equipoId);
}