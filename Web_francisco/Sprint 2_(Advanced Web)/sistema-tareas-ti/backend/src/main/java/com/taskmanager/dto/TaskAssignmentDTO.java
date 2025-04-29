// src/main/java/com/taskmanager/dto/TaskAssignmentDTO.java
package com.taskmanager.dto;

public class TaskAssignmentDTO {
    private Long taskId;
    private Long userId;

    // Getters and Setters
    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}