package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.service.ISeatService;
import com.vinhnd.ticinema_server.repository.ISeatRepository;
import org.springframework.stereotype.Service;

@Service
public class SeatService implements ISeatService {
      private final ISeatRepository seatRepository;
      public SeatService (ISeatRepository seatRepository){
        this.seatRepository = seatRepository;
      }
    // implementation here
}