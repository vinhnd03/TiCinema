package com.vinhnd.ticinema_server.repository;

import com.vinhnd.ticinema_server.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
    // methods here
}