package com.vinhnd.ticinema_server.repository;

import com.vinhnd.ticinema_server.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMovieRepository extends JpaRepository<Movie, Long> { 
    // methods here
}