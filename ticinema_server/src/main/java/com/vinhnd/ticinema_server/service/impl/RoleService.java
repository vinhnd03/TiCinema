package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.entity.Role;
import com.vinhnd.ticinema_server.service.IRoleService;
import com.vinhnd.ticinema_server.repository.IRoleRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    private final IRoleRepository roleRepository;

    public RoleService(IRoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Optional<Role> findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }
}