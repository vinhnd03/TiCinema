package com.vinhnd.ticinema_server.dto;

public record LoginRequest (String email, String password, Boolean rememberMe) {
}
