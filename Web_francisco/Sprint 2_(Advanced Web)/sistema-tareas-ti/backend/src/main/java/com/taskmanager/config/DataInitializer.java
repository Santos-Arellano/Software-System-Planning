///Users/santosa/Documents/GitHub/Software-System-Planning/Web_francisco/Sprint 2_(Advanced Web)/sistema-tareas-ti/backend/src/main/java/com/taskmanager/config/DataInitializer.java
package com.taskmanager.config;

import com.taskmanager.dto.TaskDTO;
import com.taskmanager.dto.UserDTO;
import com.taskmanager.service.TaskService;
import com.taskmanager.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Collections;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initializeData(
            UserService userService,
            TaskService taskService,
            SimpMessagingTemplate messagingTemplate) {
        
        return args -> {
            // Ejecutar esto después de que la aplicación se inicie completamente
            System.out.println("Preparando datos iniciales para WebSocket");
            
            // Obtener datos
            List<UserDTO> users = userService.getAllUsersDto();
            List<TaskDTO> tasks = taskService.getAllTasksDto();
            
            // Enviar datos iniciales a través de WebSocket
            messagingTemplate.convertAndSend("/topic/users", users != null ? users : Collections.emptyList());
            messagingTemplate.convertAndSend("/topic/tasks", tasks != null ? tasks : Collections.emptyList());
            
            System.out.println("Datos iniciales enviados a través de WebSocket");
        };
    }
}
