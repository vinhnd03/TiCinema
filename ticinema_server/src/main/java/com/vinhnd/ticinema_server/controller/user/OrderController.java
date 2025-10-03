package com.vinhnd.ticinema_server.controller.user;

import com.vinhnd.ticinema_server.dto.ShowtimeSeatDTO;
import com.vinhnd.ticinema_server.entity.Showtime;
import com.vinhnd.ticinema_server.entity.ShowtimeSeat;
import com.vinhnd.ticinema_server.entity.User;
import com.vinhnd.ticinema_server.enums.BookingStatus;
import com.vinhnd.ticinema_server.service.IShowtimeSeatService;
import com.vinhnd.ticinema_server.service.IShowtimeService;
import com.vinhnd.ticinema_server.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
    private final SimpMessagingTemplate messagingTemplate;
    private final IShowtimeSeatService showtimeSeatService;
    private final IShowtimeService showtimeService;
    private final IUserService userService;

    @PostMapping("/select-seat/{showtimeSeatId}/{userId}/select")
    public ResponseEntity selectSeat(@PathVariable Long showtimeSeatId, @PathVariable Long userId){
        Optional<ShowtimeSeat> showtimeSeat = showtimeSeatService.findById(showtimeSeatId);
        Optional<User> user = userService.findById(userId);

        if(showtimeSeat.isEmpty() || user.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false));
        }

        ShowtimeSeat entity = showtimeSeat.get();
        showtimeSeatService.selectSeat(entity, user.get());

        ShowtimeSeatDTO dto = ShowtimeSeatDTO.fromEntity(entity);
        messagingTemplate.convertAndSend("/topic/seats", dto);

        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/select-seat/{showtimeSeatId}/deselect")
    public ResponseEntity deselectSeat(@PathVariable Long showtimeSeatId){
        Optional<ShowtimeSeat> showtimeSeat = showtimeSeatService.findById(showtimeSeatId);

        if(showtimeSeat.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false));
        }

        ShowtimeSeat entity = showtimeSeat.get();
        showtimeSeatService.deselectSeat(entity);

        ShowtimeSeatDTO dto = ShowtimeSeatDTO.fromEntity(entity);
        messagingTemplate.convertAndSend("/topic/seats", dto);

        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/cancel-all/{showtimeId}/{userId}")
    public ResponseEntity cancelAll(@PathVariable Long showtimeId, @PathVariable Long userId){
        Optional<Showtime> showtime = showtimeService.findById(showtimeId);
        if (showtime.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("success", false));
        }

        showtimeSeatService.cancelAllSeats(showtimeId, userId);

        return ResponseEntity.ok(Map.of("success", true));
    }
}
