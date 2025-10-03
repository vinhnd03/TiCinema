package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.service.ITicketService;
import com.vinhnd.ticinema_server.repository.ITicketRepository;
import org.springframework.stereotype.Service;

@Service
public class TicketService implements ITicketService {
      private final ITicketRepository ticketRepository;
      public TicketService (ITicketRepository ticketRepository){
        this.ticketRepository = ticketRepository;
      }
    // implementation here
}