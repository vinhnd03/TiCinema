package com.vinhnd.ticinema_server.repository;

import com.vinhnd.ticinema_server.entity.ShowtimeSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IShowtimeSeatRepository extends JpaRepository<ShowtimeSeat, Long> {
    List<ShowtimeSeat> findByShowtime_Id(Long showtimeId);

    @Modifying
    @Transactional
    @Query("""
            UPDATE ShowtimeSeat SET expireAt = null, user = null, 
            bookingStatus = com.vinhnd.ticinema_server.enums.BookingStatus.AVAILABLE  
            WHERE showtime.id = :showtimeId AND user.id = :userId AND 
            bookingStatus = com.vinhnd.ticinema_server.enums.BookingStatus.PENDING
            """)
    void cancelAllSeats(Long showtimeId, Long userId);
}