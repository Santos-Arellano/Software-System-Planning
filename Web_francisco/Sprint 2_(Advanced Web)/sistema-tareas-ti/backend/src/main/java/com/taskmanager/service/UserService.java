// src/main/java/com/taskmanager/service/UserService.java
package com.taskmanager.service;

import com.taskmanager.dto.UserDTO;
import com.taskmanager.model.User;
import com.taskmanager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    // Constructor injection en lugar de field injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
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
}
