// src/main/java/com/taskmanager/service/TaskService.java
package com.taskmanager.service;

import com.taskmanager.dto.TaskDTO;
import com.taskmanager.dto.WebSocketMessageDTO;
import com.taskmanager.model.Task;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.model.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;
    
    // Constructor injection en lugar de field injection
    public TaskService(TaskRepository taskRepository, 
                      UserRepository userRepository, 
                      SimpMessagingTemplate messagingTemplate) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
    }
    
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    public List<TaskDTO> getAllTasksDto() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList(); // Usando toList() en lugar de collect(Collectors.toList())
    }
    
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
    
    public Task saveTask(Task task) {
        if (task.getStatus() == null) {
            task.setStatus(TaskStatus.PENDING);
        }
        Task savedTask = taskRepository.save(task);
        notifyTaskChange();
        return savedTask;
    }
    
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
        notifyTaskChange();
    }
    
    public List<Task> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status);
    }
    
    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }
    
    @Transactional
    public Task assignTaskToUser(Long taskId, Long userId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        Optional<User> optionalUser = userRepository.findById(userId);
        
        if (optionalTask.isPresent() && optionalUser.isPresent()) {
            Task task = optionalTask.get();
            User user = optionalUser.get();
            
            // Verificar si el usuario está disponible y no tiene más de 4 tareas
            if (user.isAvailable() && user.getTasks().size() < 4) {
                task.setAssignedTo(user);
                task.setStatus(TaskStatus.ASSIGNED);
                
                Task updatedTask = taskRepository.save(task);
                
                // Notificar cambios por WebSocket
                notifyTaskChange();
                
                // Notificar asignación específica
                WebSocketMessageDTO message = new WebSocketMessageDTO(
                    "TASK_ASSIGNED",
                    convertToDTO(updatedTask)
                );
                messagingTemplate.convertAndSend("/topic/messages", message);
                
                return updatedTask;
            }
        }
        
        return null;
    }
    
    @Transactional
    public Task completeTask(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setStatus(TaskStatus.COMPLETED);
            task.setCompletedAt(LocalDateTime.now());
            
            Task completedTask = taskRepository.save(task);
            
            // Notificar cambios por WebSocket
            notifyTaskChange();
            
            // Notificar finalización específica
            WebSocketMessageDTO message = new WebSocketMessageDTO(
                "TASK_COMPLETED",
                convertToDTO(completedTask)
            );
            messagingTemplate.convertAndSend("/topic/messages", message);
            
            return completedTask;
        }
        
        return null;
    }
    
    private void notifyTaskChange() {
        List<TaskDTO> tasks = getAllTasksDto();
        messagingTemplate.convertAndSend("/topic/tasks", tasks);
    }
    
    public TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setCritical(task.isCritical());
        dto.setStatus(task.getStatus());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setCompletedAt(task.getCompletedAt());
        
        if (task.getAssignedTo() != null) {
            dto.setAssignedToId(task.getAssignedTo().getId());
            dto.setAssignedToName(task.getAssignedTo().getName());
        }
        
        return dto;
    }
}
