package com.vinhnd.ticinema_server.repository;

import com.vinhnd.ticinema_server.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IShowtimeRepository extends JpaRepository<Showtime, Long> { 
    // methods here
}