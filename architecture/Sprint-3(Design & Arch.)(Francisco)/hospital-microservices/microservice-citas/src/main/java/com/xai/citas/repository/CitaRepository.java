///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/microservice-citas/src/main/java/com/xai/citas/controller/HealthController.java
package com.xai.citas.repository;

    import com.xai.citas.model.Cita;
    import org.springframework.data.jpa.repository.JpaRepository;

    public interface CitaRepository extends JpaRepository<Cita, Long> {
    }