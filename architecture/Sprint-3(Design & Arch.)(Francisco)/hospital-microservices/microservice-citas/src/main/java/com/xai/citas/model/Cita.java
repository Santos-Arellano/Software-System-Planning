///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/microservice-citas/src/main/java/com/xai/citas/model/Cita.java
package com.xai.citas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String paciente;
    private String doctor;
    private String fecha;

    // Getters, setters, and constructors
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPaciente() { return paciente; }
    public void setPaciente(String paciente) { this.paciente = paciente; }
    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
}