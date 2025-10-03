package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.entity.Room;
import com.vinhnd.ticinema_server.service.IRoomService;
import com.vinhnd.ticinema_server.repository.IRoomRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomService implements IRoomService {
      private final IRoomRepository roomRepository;
      public RoomService (IRoomRepository roomRepository){
        this.roomRepository = roomRepository;
      }

    @Override
    public Optional<Room> findById(Long roomId) {
        return roomRepository.findById(roomId);
    }
    // implementation here
}