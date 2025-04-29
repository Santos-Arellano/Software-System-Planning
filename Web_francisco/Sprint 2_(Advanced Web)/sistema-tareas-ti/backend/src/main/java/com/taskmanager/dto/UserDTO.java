// src/main/java/com/taskmanager/dto/UserDTO.java
package com.taskmanager.dto;

import com.taskmanager.model.Level;
import com.taskmanager.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private Role role;
    private Level level;
    private boolean available;
    private boolean isLeader;
    private List<TaskDTO> tasks;
    private int taskCount;
}