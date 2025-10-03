package com.vinhnd.ticinema_server.repository;

import com.vinhnd.ticinema_server.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Long> { 
    // methods here
}