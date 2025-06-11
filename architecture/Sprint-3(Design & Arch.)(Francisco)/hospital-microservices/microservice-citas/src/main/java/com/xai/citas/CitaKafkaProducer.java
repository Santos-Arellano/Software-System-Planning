///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/microservice-citas/src/main/java/com/xai/citas/CitaKafkaProducer.java
package com.xai.citas.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class CitaKafkaProducer {

    private static final Logger logger = LoggerFactory.getLogger(CitaKafkaProducer.class);
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public CitaKafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendCitaUpdate(String message) {
        kafkaTemplate.send("citas-topic", message);
        logger.info("Sent cita update to Kafka: {}", message);
    }
}