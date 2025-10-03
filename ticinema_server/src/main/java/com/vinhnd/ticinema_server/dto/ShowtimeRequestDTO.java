package com.vinhnd.ticinema_server.dto;

import java.time.LocalDateTime;

public record ShowtimeRequestDTO(LocalDateTime startTime, LocalDateTime endTime, Long movieId, Long roomId) {
};
