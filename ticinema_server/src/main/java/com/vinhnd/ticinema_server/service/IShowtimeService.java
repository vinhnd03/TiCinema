package com.vinhnd.ticinema_server.service;

import com.vinhnd.ticinema_server.entity.Showtime;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface IShowtimeService {

    @Transactional
    Showtime createShowtime(Showtime showtime);

    Optional<Showtime> findById(Long showtimeId);
}