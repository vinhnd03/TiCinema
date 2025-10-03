package com.vinhnd.ticinema_server.dto;

import com.vinhnd.ticinema_server.entity.Role;
import com.vinhnd.ticinema_server.entity.User;

public record UserSummaryDTO(Long id, String email, String name, Role role) {
    public static UserSummaryDTO from(User user) {
        return new UserSummaryDTO(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole()
        );
    }
}
