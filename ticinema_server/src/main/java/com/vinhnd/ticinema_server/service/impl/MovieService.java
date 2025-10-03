package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.entity.Movie;
import com.vinhnd.ticinema_server.service.IMovieService;
import com.vinhnd.ticinema_server.repository.IMovieRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieService implements IMovieService {
      private final IMovieRepository movieRepository;
      public MovieService (IMovieRepository movieRepository){
        this.movieRepository = movieRepository;
      }

    @Override
    public Optional<Movie> findById(Long movieId) {
        return movieRepository.findById(movieId);
    }
}