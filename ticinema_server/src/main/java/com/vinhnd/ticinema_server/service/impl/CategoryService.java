package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.service.ICategoryService;
import com.vinhnd.ticinema_server.repository.ICategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService implements ICategoryService {
      private final ICategoryRepository categoryRepository;
      public CategoryService (ICategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
      }
    // implementation here
}