package com.kafka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KafkaMessagingSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(KafkaMessagingSystemApplication.class, args);
        System.out.println("Kafka Messaging System iniciado correctamente!");
        System.out.println("Servidor disponible en: http://localhost:8081");
        System.out.println("WebSocket endpoint: ws://localhost:8081/ws");
    }
}