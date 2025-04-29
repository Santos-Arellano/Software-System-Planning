// src/main/java/com/taskmanager/dto/WebSocketMessageDTO.java
package com.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketMessageDTO {
    private String type;
    private Object payload;
}