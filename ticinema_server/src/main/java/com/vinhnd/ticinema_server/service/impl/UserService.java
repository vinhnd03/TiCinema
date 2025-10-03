package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.entity.User;
import com.vinhnd.ticinema_server.service.IUserService;
import com.vinhnd.ticinema_server.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public boolean existedByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User register(User user) {
        String hashPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);
        return userRepository.save(user);
    }

}