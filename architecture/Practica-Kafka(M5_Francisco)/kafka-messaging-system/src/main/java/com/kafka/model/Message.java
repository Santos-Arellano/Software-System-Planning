package com.kafka.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public class Message {
    private String content;
    private String topic;
    private int partition;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    
    private String consumerGroup;
    private long offset;

    public Message() {
        this.timestamp = LocalDateTime.now();
    }

    public Message(String content, String topic, int partition) {
        this.content = content;
        this.topic = topic;
        this.partition = partition;
        this.timestamp = LocalDateTime.now();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public int getPartition() {
        return partition;
    }

    public void setPartition(int partition) {
        this.partition = partition;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getConsumerGroup() {
        return consumerGroup;
    }

    public void setConsumerGroup(String consumerGroup) {
        this.consumerGroup = consumerGroup;
    }

    public long getOffset() {
        return offset;
    }

    public void setOffset(long offset) {
        this.offset = offset;
    }

    @Override
    public String toString() {
        return "Message{" +
                "content='" + content + '\'' +
                ", topic='" + topic + '\'' +
                ", partition=" + partition +
                ", timestamp=" + timestamp +
                ", consumerGroup='" + consumerGroup + '\'' +
                ", offset=" + offset +
                '}';
    }
}