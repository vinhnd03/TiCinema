import { useEffect, useRef, useState } from "react";
import showtimeService from "../../services/showtimeService";
import orderService from "../../services/orderService";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import usePrompt from "../../hooks/useBlocker";
import { useLocation } from "react-router-dom";
import useSeatGuard from "../../hooks/useSeatGuard";

const SeatSelectionPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const stompClientRef = useRef(null);
  const location = useLocation();
  const message = "Bạn có chắc chắn muốn rời khỏi trang? Ghế đang chọn sẽ bị hủy!";
  const movie_id = 1;
  const user_id = 1;
  const showtime_id = 1;

  useSeatGuard(showtime_id, user_id, selectedSeats);

  useEffect(() => {
    const fetchData = async () => {
      const data = await showtimeService.loadSeatByMovieId(movie_id);
      setSeats(data.showtimeSeats);

      const myPendingSeats = data.showtimeSeats
        .filter((s) => s.bookingStatus === "PENDING" && s.userId === user_id)
        .map((s) => s.id);

      setSelectedSeats(myPendingSeats);
    };
    fetchData();
  }, [movie_id]);

  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe("/topic/seats", (message) => {
        const updateSeat = JSON.parse(message.body);
        console.log("Update seat from WS:", updateSeat);
        setSeats((prev) =>
          prev.map((s) => (s.id === updateSeat.id ? updateSeat : s))
        );

        if (updateSeat.bookingStatus === "AVAILABLE") {
          setSelectedSeats((prev) => prev.filter((id) => id !== updateSeat.id));
        } else if (
          updateSeat.bookingStatus === "PENDING" &&
          updateSeat.userId === user_id
        ) {
          setSelectedSeats((prev) =>
            prev.includes(updateSeat.id) ? prev : [...prev, updateSeat.id]
          );
        }
      });
    };

    client.activate();
    stompClientRef.current = client;

    return () => client.deactivate();
  }, []);

  const toggleSeat = async (seatId) => {
    if (selectedSeats.includes(seatId)) {
      // setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      await orderService.deselectSeat(seatId);
    } else {
      // setSelectedSeats([...selectedSeats, seatId]);
      await orderService.selectSeat(seatId, user_id);
    }
  };

  // Nhóm ghế theo hàng
  const rows = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-8 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 text-gray-900">
        {/* Thông tin phim */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <img
            src="https://picsum.photos/200/300?random=20"
            alt="Poster"
            className="w-32 md:w-40 rounded-lg shadow"
          />
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500">
              Avengers: Endgame
            </h2>
            <p className="mt-2 text-sm md:text-base">
              <span className="font-semibold">Rạp:</span> CGV Vincom
            </p>
            <p className="text-sm md:text-base">
              <span className="font-semibold">Suất chiếu:</span> 19:00 -
              24/09/2025
            </p>
          </div>
        </div>

        {/* Sơ đồ ghế */}
        <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
          <h3 className="text-center font-semibold text-gray-800 mb-4">
            Sơ đồ ghế
          </h3>

          <div className="flex justify-center mb-6">
            <div className="bg-orange-500 h-3 w-2/3 rounded text-center">
              <p className="rounded-full bg-orange-500 font-bold">Màn hình</p>
            </div>
          </div>

          <div className="space-y-3 mt-20">
            {Object.entries(rows).map(([rowLabel, rowSeats]) => (
              <div key={rowLabel} className="flex justify-center gap-2">
                {/* <span className="w-6 font-bold">{rowLabel}</span> */}
                {rowSeats.map((seat) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  let seatClasses = "";
                  if (seat.bookingStatus === "BOOKED") {
                    seatClasses =
                      "bg-gray-500 cursor-not-allowed text-white pointer-events-none";
                  } else if (seat.bookingStatus === "PENDING") {
                    if (seat.bookingStatus === "PENDING") {
                      if (seat.userId === user_id) {
                        seatClasses = "bg-orange-500 text-white"; // mình chọn
                      } else {
                        seatClasses = "bg-orange-300 text-white"; // người khác giữ
                      }
                    }
                  } else if (isSelected) {
                    seatClasses = "bg-orange-500 text-white"; // Ghế đang chọn
                  } else if (seat.seatType === "VIP") {
                    seatClasses = "bg-yellow-400 hover:bg-yellow-500";
                  } else {
                    seatClasses = "bg-green-200 hover:bg-green-300";
                  }

                  return (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeat(seat.id)}
                      disabled={
                        seat.seatStatus !== "ACTIVE" ||
                        seat.bookingStatus === "BOOKED" ||
                        (seat.bookingStatus === "PENDING" &&
                          seat.userId !== user_id)
                      }
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-xs sm:text-sm font-semibold ${seatClasses}`}
                    >
                      {seat.row + seat.number}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-200 rounded"></span>
              <span>Trống</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-orange-500 rounded"></span>
              <span>Đang chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-500 rounded"></span>
              <span>Đã đặt</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-yellow-400 rounded"></span>
              <span>VIP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-200 rounded"></span>
              <span>Khoá</span>
            </div>
          </div>
        </div>

        {/* Thanh thanh toán */}
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm md:text-base">
            Ghế đã chọn:{" "}
            {selectedSeats.length > 0 ? (
              <span className="font-semibold text-orange-500">
                {selectedSeats
                  .map((id) => {
                    const s = seats.find((seat) => seat.id === id);
                    return s ? `${s.row}${s.number}` : "";
                  })
                  .join(", ")}
              </span>
            ) : (
              "Chưa chọn"
            )}
          </div>
          <div className="flex items-center gap-4 min-w-60">
            <div className="font-semibold text-sm md:text-base">
              Tổng:{" "}
              <span className="text-orange-500">
                {selectedSeats.length * 75000}đ
              </span>
            </div>
            <button
              disabled={selectedSeats.length === 0}
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white rounded-lg font-semibold shadow transition"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
