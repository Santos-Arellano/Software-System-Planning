package com.xai.pacientes.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import java.util.concurrent.CompletableFuture;

@Component
public class PacienteKafkaProducer {

    private static final Logger logger = LoggerFactory.getLogger(PacienteKafkaProducer.class);

    private final KafkaTemplate<String, String> kafkaTemplate;
    
    @Value("${kafka.topic.pacientes}")
    private String pacientesTopic;

    @Autowired
    public PacienteKafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendPacienteUpdate(String message) {
        try {
            logger.info("Sending message to Kafka topic {}: {}", pacientesTopic, message);
            CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send(pacientesTopic, message);

            future.whenComplete((result, ex) -> {
                if (ex == null) {
                    logger.info("Message sent successfully to topic {}", pacientesTopic);
                } else {
                    logger.error("Failed to send message to topic {}: {}", pacientesTopic, ex.getMessage());
                }
            });
        } catch (Exception e) {
            logger.error("Error while sending message to Kafka: {}", e.getMessage());
            throw new RuntimeException("Failed to send message to Kafka", e);
        }
    }
}
