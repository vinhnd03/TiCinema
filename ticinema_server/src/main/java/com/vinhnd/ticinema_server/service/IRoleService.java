package com.vinhnd.ticinema_server.service;

import com.vinhnd.ticinema_server.entity.Role;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName(String name);

    Role save(Role role);
    // methods here
}