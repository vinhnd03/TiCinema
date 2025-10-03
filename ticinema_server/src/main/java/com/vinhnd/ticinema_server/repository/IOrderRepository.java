package com.vinhnd.ticinema_server.repository;

import com.vinhnd.ticinema_server.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderRepository extends JpaRepository<Order, Long> { 
    // methods here
}