///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/gestion-equipos/src/main/java/com/ejemplo/gestion_equipos/GestionEquiposApplication.java
package com.ejemplo.gestionequipos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.ejemplo.gestionequipos.repository")
public class GestionEquiposApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionEquiposApplication.class, args);
    }

}
