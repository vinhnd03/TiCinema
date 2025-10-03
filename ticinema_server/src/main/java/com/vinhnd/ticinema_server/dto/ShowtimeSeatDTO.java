package com.vinhnd.ticinema_server.dto;

import com.vinhnd.ticinema_server.entity.ShowtimeSeat;

import java.time.LocalDateTime;

public record ShowtimeSeatDTO(
        Long id,
        String row,
        Integer number,
        String seatType,
        String seatStatus,
        String bookingStatus,
        LocalDateTime expireAt,
        Long userId) {
    public static ShowtimeSeatDTO fromEntity(ShowtimeSeat entity) {
        return new ShowtimeSeatDTO(
                entity.getId(),
                entity.getSeat().getRowLabel(),
                entity.getSeat().getSeatNumber(),
                entity.getSeat().getSeatType().name(),
                entity.getSeat().getSeatStatus().name(),
                entity.getBookingStatus().name(),
                entity.getExpireAt(),
                entity.getUser() != null ? entity.getUser().getId() : null
        );
    }
}
