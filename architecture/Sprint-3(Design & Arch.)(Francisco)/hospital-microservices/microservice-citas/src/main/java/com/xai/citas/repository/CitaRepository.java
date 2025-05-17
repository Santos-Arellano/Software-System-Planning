package com.xai.citas.repository;

    import com.xai.citas.model.Cita;
    import org.springframework.data.jpa.repository.JpaRepository;

    public interface CitaRepository extends JpaRepository<Cita, Long> {
    }