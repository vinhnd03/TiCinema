package com.vinhnd.ticinema_server.repository;

import com.vinhnd.ticinema_server.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITicketRepository extends JpaRepository<Ticket, Long> { 
    // methods here
}