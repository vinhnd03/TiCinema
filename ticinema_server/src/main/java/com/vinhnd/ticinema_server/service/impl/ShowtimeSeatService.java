package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.entity.ShowtimeSeat;
import com.vinhnd.ticinema_server.entity.User;
import com.vinhnd.ticinema_server.enums.BookingStatus;
import com.vinhnd.ticinema_server.repository.IShowtimeSeatRepository;
import com.vinhnd.ticinema_server.service.IShowtimeSeatService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeSeatService implements IShowtimeSeatService {
    private final IShowtimeSeatRepository showtimeSeatRepository;

    public ShowtimeSeatService(IShowtimeSeatRepository showtimeSeatRepository) {
        this.showtimeSeatRepository = showtimeSeatRepository;
    }

    @Override
    public List<ShowtimeSeat> findSeatByShowtimeId(Long showtimeId) {
        return showtimeSeatRepository.findByShowtime_Id(showtimeId);
    }

    @Override
    public Optional<ShowtimeSeat> findById(Long showtimeSeatId) {
        return showtimeSeatRepository.findById(showtimeSeatId);
    }

    @Override
    public ShowtimeSeat selectSeat(ShowtimeSeat showtimeSeat, User user) {
        showtimeSeat.setBookingStatus(BookingStatus.PENDING);
        showtimeSeat.setExpireAt(LocalDateTime.now().plusMinutes(5));
        showtimeSeat.setUser(user);
        return showtimeSeatRepository.save(showtimeSeat);
    }

    @Override
    public ShowtimeSeat deselectSeat(ShowtimeSeat showtimeSeat) {
        showtimeSeat.setBookingStatus(BookingStatus.AVAILABLE);
        showtimeSeat.setExpireAt(null);
        showtimeSeat.setUser(null);
        return showtimeSeatRepository.save(showtimeSeat);
    }

    @Override
    public void bookSeat(ShowtimeSeat showtimeSeat) {
        showtimeSeat.setBookingStatus(BookingStatus.BOOKED);
        showtimeSeatRepository.save(showtimeSeat);
    }

    @Override
    public void cancelAllSeats(Long showtimeId, Long userId) {
        showtimeSeatRepository.cancelAllSeats(showtimeId, userId);
    }

}