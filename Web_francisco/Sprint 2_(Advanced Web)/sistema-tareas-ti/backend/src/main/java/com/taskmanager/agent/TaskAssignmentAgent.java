// src/main/java/com/taskmanager/agent/TaskAssignmentAgent.java
package com.taskmanager.agent;

import com.taskmanager.model.Task;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.model.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TaskAssignmentAgent {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TaskService taskService;
    
    /**
     * Ejecuta el agente para asignar tareas automáticamente según las reglas definidas.
     */
    public void runAgent() {
        List<Task> pendingTasks = taskRepository.findByStatus(TaskStatus.PENDING);
        
        for (Task task : pendingTasks) {
            assignTaskBasedOnRules(task);
        }
    }
    
    /**
     * Asigna una tarea basada en las reglas definidas.
     * 
     * Regla 1: Asignar tareas solo a trabajadores disponibles.
     * Regla 2: Priorizar asignación a trabajadores senior cuando la tarea es crítica.
     * Regla 3: No asignar más de 4 tareas simultáneas por trabajador.
     */
    private void assignTaskBasedOnRules(Task task) {
        Optional<User> assignedUser = Optional.empty();
        
        // Si la tarea es crítica, intenta asignarla a un senior disponible primero
        if (task.isCritical()) {
            List<User> seniorUsers = userRepository.findAvailableSeniorUsersWithLessThan4Tasks();
            if (!seniorUsers.isEmpty()) {
                // Asignar al usuario senior con menos tareas
                assignedUser = seniorUsers.stream()
                        .reduce((u1, u2) -> u1.getTasks().size() < u2.getTasks().size() ? u1 : u2);
            }
        }
        
        // Si no se pudo asignar a un senior o si la tarea no es crítica
        if (assignedUser.isEmpty()) {
            List<User> availableUsers = userRepository.findAvailableUsersWithLessThan4Tasks();
            if (!availableUsers.isEmpty()) {
                // Asignar al usuario con menos tareas
                assignedUser = availableUsers.stream()
                        .reduce((u1, u2) -> u1.getTasks().size() < u2.getTasks().size() ? u1 : u2);
            }
        }
        
        // Si encontramos un usuario disponible, asignamos la tarea
        assignedUser.ifPresent(user -> 
            taskService.assignTaskToUser(task.getId(), user.getId())
        );
    }
}