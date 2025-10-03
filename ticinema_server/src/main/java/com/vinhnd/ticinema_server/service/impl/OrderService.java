package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.service.IOrderService;
import com.vinhnd.ticinema_server.repository.IOrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService implements IOrderService {
      private final IOrderRepository orderRepository;
      public OrderService (IOrderRepository orderRepository){
        this.orderRepository = orderRepository;
      }
    // implementation here
}