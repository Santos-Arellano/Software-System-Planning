package com.kafka.service;

import com.kafka.model.Message;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ConsumerService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @KafkaListener(
        topics = "topico1",
        containerFactory = "kafkaListenerContainerFactoryTopic1Partition0",
        topicPartitions = @org.springframework.kafka.annotation.TopicPartition(
            topic = "topico1", 
            partitions = {"0"}
        )
    )
    public void consumeFromTopic1Partition0(
            ConsumerRecord<String, String> record,
            @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            Acknowledgment ack) {
        
        processMessage(record, topic, partition, "topico1-partition0-group");
        ack.acknowledge();
    }

    @KafkaListener(
        topics = "topico1",
        containerFactory = "kafkaListenerContainerFactoryTopic1Partition1",
        topicPartitions = @org.springframework.kafka.annotation.TopicPartition(
            topic = "topico1", 
            partitions = {"1"}
        )
    )
    public void consumeFromTopic1Partition1(
            ConsumerRecord<String, String> record,
            @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            Acknowledgment ack) {
        
        processMessage(record, topic, partition, "topico1-partition1-group");
        ack.acknowledge();
    }

    @KafkaListener(
        topics = "topico2",
        containerFactory = "kafkaListenerContainerFactoryTopic2Partition0",
        topicPartitions = @org.springframework.kafka.annotation.TopicPartition(
            topic = "topico2", 
            partitions = {"0"}
        )
    )
    public void consumeFromTopic2Partition0(
            ConsumerRecord<String, String> record,
            @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            Acknowledgment ack) {
        
        processMessage(record, topic, partition, "topico2-partition0-group");
        ack.acknowledge();
    }

    @KafkaListener(
        topics = "topico2",
        containerFactory = "kafkaListenerContainerFactoryTopic2Partition1",
        topicPartitions = @org.springframework.kafka.annotation.TopicPartition(
            topic = "topico2", 
            partitions = {"1"}
        )
    )
    public void consumeFromTopic2Partition1(
            ConsumerRecord<String, String> record,
            @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            Acknowledgment ack) {
        
        processMessage(record, topic, partition, "topico2-partition1-group");
        ack.acknowledge();
    }

    @KafkaListener(
        topics = "topico3",
        containerFactory = "kafkaListenerContainerFactoryTopic3Partition0",
        topicPartitions = @org.springframework.kafka.annotation.TopicPartition(
            topic = "topico3", 
            partitions = {"0"}
        )
    )
    public void consumeFromTopic3Partition0(
            ConsumerRecord<String, String> record,
            @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            Acknowledgment ack) {
        
        processMessage(record, topic, partition, "topico3-partition0-group");
        ack.acknowledge();
    }

    @KafkaListener(
        topics = "topico3",
        containerFactory = "kafkaListenerContainerFactoryTopic3Partition1",
        topicPartitions = @org.springframework.kafka.annotation.TopicPartition(
            topic = "topico3", 
            partitions = {"1"}
        )
    )
    public void consumeFromTopic3Partition1(
            ConsumerRecord<String, String> record,
            @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            Acknowledgment ack) {
        
        processMessage(record, topic, partition, "topico3-partition1-group");
        ack.acknowledge();
    }

    private void processMessage(ConsumerRecord<String, String> record, String topic, int partition, String consumerGroup) {
        Message message = new Message();
        message.setContent(record.value());
        message.setTopic(topic);
        message.setPartition(partition);
        message.setConsumerGroup(consumerGroup);
        message.setOffset(record.offset());

        System.out.println("Mensaje recibido por " + consumerGroup + ": " + message);

        messagingTemplate.convertAndSend("/topic/messages", message);
    }
}