package com.xai.alertas.repository;

    import com.xai.alertas.model.Alerta;
    import org.springframework.data.jpa.repository.JpaRepository;

    public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    }