package com.vinhnd.ticinema_server.service;

import com.vinhnd.ticinema_server.entity.ShowtimeSeat;
import com.vinhnd.ticinema_server.entity.User;

import java.util.List;
import java.util.Optional;

public interface IShowtimeSeatService {
    List<ShowtimeSeat> findSeatByShowtimeId(Long showtimeId);

    Optional<ShowtimeSeat> findById(Long showtimeSeatId);

    ShowtimeSeat selectSeat(ShowtimeSeat showtimeSeat, User user);

    ShowtimeSeat deselectSeat(ShowtimeSeat showtimeSeat);

    void bookSeat(ShowtimeSeat showtimeSeat);

    void cancelAllSeats(Long showtimeId, Long userId);
    // methods here
}