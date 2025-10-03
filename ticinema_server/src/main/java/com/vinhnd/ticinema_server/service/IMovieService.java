package com.vinhnd.ticinema_server.service;

import com.vinhnd.ticinema_server.entity.Movie;

import java.util.Optional;

public interface IMovieService {
    Optional<Movie> findById(Long movieId);
    // methods here
}