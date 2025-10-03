package com.vinhnd.ticinema_server.repository;

import com.vinhnd.ticinema_server.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ISeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByRoomId(Long id);
    // methods here
}