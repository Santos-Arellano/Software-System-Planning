package com.kafka.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class ProducerService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public String sendMessage(String message) {
        String targetTopic = determineTopicFromMessage(message);
        
        if (targetTopic == null) {
            return "Error: El mensaje debe contener 'topico1', 'topico2' o 'topico3'";
        }

        try {
            int partition = ThreadLocalRandom.current().nextInt(0, 2);
            
            CompletableFuture<SendResult<String, String>> future = 
                kafkaTemplate.send(targetTopic, partition, null, message);
            
            future.whenComplete((result, ex) -> {
                if (ex == null) {
                    System.out.println("Mensaje enviado=[" + message + "] " +
                            "al tópico=[" + targetTopic + "] " +
                            "partición=[" + partition + "] " +
                            "offset=[" + result.getRecordMetadata().offset() + "]");
                } else {
                    System.err.println("Error al enviar mensaje=[" + message + "] " +
                            "debido a: " + ex.getMessage());
                }
            });
            
            return "Mensaje enviado exitosamente a " + targetTopic + " partición " + partition;
            
        } catch (Exception e) {
            return "Error al enviar mensaje: " + e.getMessage();
        }
    }

    private String determineTopicFromMessage(String message) {
        String lowerMessage = message.toLowerCase();
        
        if (lowerMessage.contains("topico1")) {
            return "topico1";
        } else if (lowerMessage.contains("topico2")) {
            return "topico2";
        } else if (lowerMessage.contains("topico3")) {
            return "topico3";
        }
        
        return null;
    }
}