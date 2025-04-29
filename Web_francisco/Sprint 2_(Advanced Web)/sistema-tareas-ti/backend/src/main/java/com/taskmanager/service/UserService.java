// src/main/java/com/taskmanager/service/UserService.java
package com.taskmanager.service;

import com.taskmanager.dto.UserDTO;
import com.taskmanager.model.User;
import com.taskmanager.repository.UserRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;
    
    // Constructor injection en lugar de field injection
    public UserService(UserRepository userRepository, SimpMessagingTemplate messagingTemplate) {
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public List<UserDTO> getAllUsersDto() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList(); // Método moderno en lugar de collect(Collectors.toList())
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public User saveUser(User user) {
        User savedUser = userRepository.save(user);
        notifyUserChange();
        return savedUser;
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
        notifyUserChange();
    }
    
    public List<User> getAvailableUsers() {
        return userRepository.findByAvailableTrue();
    }
    
    public List<User> getAvailableUsersWithLessThan4Tasks() {
        return userRepository.findAvailableUsersWithLessThan4Tasks();
    }
    
    public List<User> getAvailableSeniorUsersWithLessThan4Tasks() {
        return userRepository.findAvailableSeniorUsersWithLessThan4Tasks();
    }
    
    public UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setRole(user.getRole());
        dto.setLevel(user.getLevel());
        dto.setAvailable(user.isAvailable());
        dto.setLeader(user.isLeader());
        dto.setTaskCount(user.getTasks().size());
        return dto;
    }
    
    private void notifyUserChange() {
        List<UserDTO> users = getAllUsersDto();
        messagingTemplate.convertAndSend("/topic/users", users);
        System.out.println("Notificación de cambio de usuarios enviada");
    }
}
