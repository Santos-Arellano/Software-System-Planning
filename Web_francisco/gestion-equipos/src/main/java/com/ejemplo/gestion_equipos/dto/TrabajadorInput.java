///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/dto/TrabajadorInput.java
package com.ejemplo.gestionequipos.dto;

public class TrabajadorInput {
    private String nombre;
    private String apellido;
    private String rol;
    private String email;
    private Long equipoId;
    
    // Constructores
    public TrabajadorInput() {}
    
    public TrabajadorInput(String nombre, String apellido, String rol, String email, Long equipoId) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.rol = rol;
        this.email = email;
        this.equipoId = equipoId;
    }
    
    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }
    
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public Long getEquipoId() { return equipoId; }
    public void setEquipoId(Long equipoId) { this.equipoId = equipoId; }
}