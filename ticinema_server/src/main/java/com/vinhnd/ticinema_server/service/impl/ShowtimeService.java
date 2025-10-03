package com.vinhnd.ticinema_server.service.impl;

import com.vinhnd.ticinema_server.entity.Seat;
import com.vinhnd.ticinema_server.entity.Showtime;
import com.vinhnd.ticinema_server.entity.ShowtimeSeat;
import com.vinhnd.ticinema_server.enums.BookingStatus;
import com.vinhnd.ticinema_server.repository.ISeatRepository;
import com.vinhnd.ticinema_server.repository.IShowtimeSeatRepository;
import com.vinhnd.ticinema_server.service.IShowtimeService;
import com.vinhnd.ticinema_server.repository.IShowtimeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeService implements IShowtimeService {
    private final IShowtimeRepository showtimeRepository;
    private final ISeatRepository seatRepository;
    private final IShowtimeSeatRepository showtimeSeatRepository;

    public ShowtimeService(IShowtimeRepository showtimeRepository, ISeatRepository seatRepository, IShowtimeSeatRepository showtimeSeatRepository) {
        this.showtimeRepository = showtimeRepository;
        this.seatRepository = seatRepository;
        this.showtimeSeatRepository = showtimeSeatRepository;
    }

    @Override
    @Transactional
    public Showtime createShowtime(Showtime showtime) {
        // 1. Lưu suất chiếu
        Showtime savedShowtime = showtimeRepository.save(showtime);

        // 2. Lấy danh sách ghế theo room
        List<Seat> seats = seatRepository.findByRoomId(showtime.getRoom().getId());

        // 3. Map sang showtime_seats
        List<ShowtimeSeat> showtimeSeats = seats.stream()
                .map(seat -> {
                    ShowtimeSeat ss = new ShowtimeSeat();
                    ss.setShowtime(savedShowtime);
                    ss.setSeat(seat);
                    ss.setBookingStatus(BookingStatus.AVAILABLE);
                    return ss;
                })
                .toList();

        // 4. Lưu danh sách ghế suất chiếu
        showtimeSeatRepository.saveAll(showtimeSeats);

        return savedShowtime;
    }

    @Override
    public Optional<Showtime> findById(Long showtimeId) {
        return showtimeRepository.findById(showtimeId);
    }
}