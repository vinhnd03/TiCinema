package com.vinhnd.ticinema_server.repository;

import com.vinhnd.ticinema_server.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoomRepository extends JpaRepository<Room, Long> { 
    // methods here
}