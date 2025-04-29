// src/main/java/com/taskmanager/repository/UserRepository.java
package com.taskmanager.repository;

import com.taskmanager.model.Level;
import com.taskmanager.model.Role;
import com.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    List<User> findByAvailableTrue();
    
    List<User> findByRoleAndLevelAndAvailableTrue(Role role, Level level);
    
    @Query("SELECT u FROM User u WHERE u.available = true AND SIZE(u.tasks) < 4")
    List<User> findAvailableUsersWithLessThan4Tasks();
    
    @Query("SELECT u FROM User u WHERE u.available = true AND u.level = 'SENIOR' AND SIZE(u.tasks) < 4")
    List<User> findAvailableSeniorUsersWithLessThan4Tasks();
}