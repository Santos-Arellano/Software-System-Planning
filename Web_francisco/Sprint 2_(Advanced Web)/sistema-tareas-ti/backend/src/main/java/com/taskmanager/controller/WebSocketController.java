// src/main/java/com/taskmanager/controller/WebSocketController.java
package com.taskmanager.controller;

import com.taskmanager.dto.TaskDTO;
import com.taskmanager.dto.UserDTO;
import com.taskmanager.dto.WebSocketMessageDTO;
import com.taskmanager.service.TaskService;
import com.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class WebSocketController {
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private TaskService taskService;
    
    @Autowired
    private UserService userService;
    
    @MessageMapping("/message")
    public void processMessage(WebSocketMessageDTO message) {
        messagingTemplate.convertAndSend("/topic/messages", message);
    }
    
    @MessageMapping("/requestInitialData")
    public void requestInitialData() {
        // Cuando un cliente solicita datos iniciales explícitamente
        List<UserDTO> users = userService.getAllUsersDto();
        List<TaskDTO> tasks = taskService.getAllTasksDto();
        
        messagingTemplate.convertAndSend("/topic/users", users);
        messagingTemplate.convertAndSend("/topic/tasks", tasks);
        
        System.out.println("Datos iniciales enviados a petición del cliente");
    }
    
    @MessageMapping("/ping")
    @SendTo("/topic/pong")
    public String handlePing() {
        return "pong";
    }
}
