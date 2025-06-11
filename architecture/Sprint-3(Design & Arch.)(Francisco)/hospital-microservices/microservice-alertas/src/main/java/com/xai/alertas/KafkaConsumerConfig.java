///Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/microservice-alertas/src/main/java/com/xai/alertas/KafkaConsumerConfig.java
package com.xai.alertas.config;

import com.xai.alertas.model.Alerta;
import com.xai.alertas.service.AlertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableKafka
public class KafkaConsumerConfig {

    @Bean
    public ConsumerFactory<String, String> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:29092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "alertas-group");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        return new DefaultKafkaConsumerFactory<>(props);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, String> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }

    @org.springframework.stereotype.Component
    public static class AlertaKafkaConsumer {
        @Autowired
        private AlertaService alertaService;

        @KafkaListener(topics = "pacientes-topic", groupId = "alertas-group")
        public void listenPacienteUpdates(String message) {
            Alerta alerta = new Alerta();
            alerta.setMensaje("Paciente actualizado: " + message);
            alerta.setTipo("INFO");
            alerta.setFecha(LocalDateTime.now());
            alerta.setEstado("PENDIENTE");
            alerta.setDestinatario("admin");
            alertaService.saveAlerta(alerta);
        }

        @KafkaListener(topics = "citas-topic", groupId = "alertas-group")
        public void listenCitaUpdates(String message) {
            Alerta alerta = new Alerta();
            alerta.setMensaje("Nueva cita agendada: " + message);
            alerta.setTipo("ALERT");
            alerta.setFecha(LocalDateTime.now());
            alerta.setEstado("PENDIENTE");
            alerta.setDestinatario("doctor");
            alertaService.saveAlerta(alerta);
        }
    }
}