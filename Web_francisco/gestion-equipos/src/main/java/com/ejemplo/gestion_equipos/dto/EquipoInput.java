///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/dto/EquipoInput.java
package com.ejemplo.gestionequipos.dto;

import java.time.LocalDate;

public class EquipoInput {
    private String nombre;
    private String proyecto;
    private String lider;
    private LocalDate fechaCreacion;
    private String descripcion;
    
    // Constructores
    public EquipoInput() {}
    
    public EquipoInput(String nombre, String proyecto, String lider, LocalDate fechaCreacion, String descripcion) {
        this.nombre = nombre;
        this.proyecto = proyecto;
        this.lider = lider;
        this.fechaCreacion = fechaCreacion;
        this.descripcion = descripcion;
    }
    
    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getProyecto() { return proyecto; }
    public void setProyecto(String proyecto) { this.proyecto = proyecto; }
    
    public String getLider() { return lider; }
    public void setLider(String lider) { this.lider = lider; }
    
    public LocalDate getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDate fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}