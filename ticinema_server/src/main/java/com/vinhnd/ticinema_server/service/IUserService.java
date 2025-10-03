package com.vinhnd.ticinema_server.service;

import com.vinhnd.ticinema_server.dto.RegisterRequest;
import com.vinhnd.ticinema_server.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface IUserService {
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long userId);

    boolean existedByEmail(String email);

    User register(User user);
    // methods here
}