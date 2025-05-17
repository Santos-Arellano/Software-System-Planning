///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/microservice-alertas/src/main/java/com/xai/alertas/AlertasApplication.java
package com.xai.alertas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka
public class AlertasApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlertasApplication.class, args);
    }
}