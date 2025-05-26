///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/repository/EquipoDeTrabajoRepository.java
package com.ejemplo.gestionequipos.repository;

import com.ejemplo.gestionequipos.entity.EquipoDeTrabajo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipoDeTrabajoRepository extends JpaRepository<EquipoDeTrabajo, Long> {
    
    @Query("SELECT e FROM EquipoDeTrabajo e LEFT JOIN FETCH e.trabajadores")
    List<EquipoDeTrabajo> findAllWithTrabajadores();
    
    @Query("SELECT e FROM EquipoDeTrabajo e LEFT JOIN FETCH e.trabajadores WHERE e.id = :id")
    Optional<EquipoDeTrabajo> findByIdWithTrabajadores(Long id);
}