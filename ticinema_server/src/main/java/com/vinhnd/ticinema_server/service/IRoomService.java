package com.vinhnd.ticinema_server.service;

import com.vinhnd.ticinema_server.entity.Room;

import java.util.Optional;

public interface IRoomService {
    Optional<Room> findById(Long roomId);
    // methods here
}