package com.vinhnd.ticinema_server.controller.user;

import com.vinhnd.ticinema_server.dto.ShowtimeRequestDTO;
import com.vinhnd.ticinema_server.dto.ShowtimeSeatDTO;
import com.vinhnd.ticinema_server.entity.Movie;
import com.vinhnd.ticinema_server.entity.Room;
import com.vinhnd.ticinema_server.entity.Showtime;
import com.vinhnd.ticinema_server.entity.ShowtimeSeat;
import com.vinhnd.ticinema_server.service.IMovieService;
import com.vinhnd.ticinema_server.service.IRoomService;
import com.vinhnd.ticinema_server.service.IShowtimeSeatService;
import com.vinhnd.ticinema_server.service.IShowtimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/showtime")
@RequiredArgsConstructor
public class ShowtimeController {
    private final IShowtimeService showtimeService;
    private final IMovieService movieService;
    private final IRoomService roomService;
    private final IShowtimeSeatService showtimeSeatService;

    @PostMapping
    public ResponseEntity createShowtime(@RequestBody ShowtimeRequestDTO showtimeRequest) {
        Optional<Movie> movie = movieService.findById(showtimeRequest.movieId());
        Optional<Room> room = roomService.findById(showtimeRequest.roomId());

        if (movie.isEmpty() || room.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false));
        }

        Showtime showtime = new Showtime();
        showtime.setEndTime(showtimeRequest.endTime());
        showtime.setStartTime(showtimeRequest.startTime());
        showtime.setRoom(room.get());
        showtime.setMovie(movie.get());

        Showtime returnShowtime = showtimeService.createShowtime(showtime);

        return ResponseEntity.status(201).body(Map.of("success", true, "showtime", returnShowtime));
    }

    @GetMapping("{showtimeId}/seats")
    public ResponseEntity getSeatList(@PathVariable Long showtimeId) {
        Optional<Showtime> showtime = showtimeService.findById(showtimeId);
        if (showtime.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "SHOWTIME_NOT_FOUND"));
        }
        List<ShowtimeSeat> showtimeSeats = showtimeSeatService.findSeatByShowtimeId(showtimeId);

        List<ShowtimeSeatDTO> showtimeSeatDTOS = showtimeSeats.stream()
                .map(ss -> ShowtimeSeatDTO.fromEntity(ss))
                .toList();

        return ResponseEntity.ok(Map.of("success", true, "showtimeSeats", showtimeSeatDTOS));
    }
}
