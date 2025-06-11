///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/microservice-alertas/src/main/java/com/xai/alertas/repository/AlertaRepository.java
package com.xai.alertas.repository;

    import com.xai.alertas.model.Alerta;
    import org.springframework.data.jpa.repository.JpaRepository;

    public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    }