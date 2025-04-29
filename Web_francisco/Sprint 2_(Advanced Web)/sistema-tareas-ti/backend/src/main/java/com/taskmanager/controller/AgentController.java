// src/main/java/com/taskmanager/controller/AgentController.java
package com.taskmanager.controller;

import com.taskmanager.agent.TaskAssignmentAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/agent")
@CrossOrigin(origins = "*")
public class AgentController {
    
    @Autowired
    private TaskAssignmentAgent taskAssignmentAgent;
    
    @PostMapping("/run")
    public ResponseEntity<String> runAgent() {
        taskAssignmentAgent.runAgent();
        return ResponseEntity.ok("Agent executed successfully");
    }
}