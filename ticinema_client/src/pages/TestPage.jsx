import React, { useState } from "react";
const seats = [
  // Row A
  { id: 1, row_label: "A", seat_number: 1, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 2, row_label: "A", seat_number: 2, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 3, row_label: "A", seat_number: 3, seat_type: "VIP", is_active: true, isBooked: true },
  { id: 4, row_label: "A", seat_number: 4, seat_type: "VIP", is_active: true, isBooked: false },
  { id: 5, row_label: "A", seat_number: 5, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 6, row_label: "A", seat_number: 6, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 7, row_label: "A", seat_number: 7, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 8, row_label: "A", seat_number: 8, seat_type: "STANDARD", is_active: true, isBooked: false },

  // Row B
  { id: 9, row_label: "B", seat_number: 1, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 10, row_label: "B", seat_number: 2, seat_type: "STANDARD", is_active: true, isBooked: true },
  { id: 11, row_label: "B", seat_number: 3, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 12, row_label: "B", seat_number: 4, seat_type: "VIP", is_active: true, isBooked: false },
  { id: 13, row_label: "B", seat_number: 5, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 14, row_label: "B", seat_number: 6, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 15, row_label: "B", seat_number: 7, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 16, row_label: "B", seat_number: 8, seat_type: "STANDARD", is_active: true, isBooked: false },

  // Row C
  { id: 17, row_label: "C", seat_number: 1, seat_type: "STANDARD", is_active: false, isBooked: false },
  { id: 18, row_label: "C", seat_number: 2, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 19, row_label: "C", seat_number: 3, seat_type: "STANDARD", is_active: true, isBooked: true },
  { id: 20, row_label: "C", seat_number: 4, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 21, row_label: "C", seat_number: 5, seat_type: "VIP", is_active: true, isBooked: false },
  { id: 22, row_label: "C", seat_number: 6, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 23, row_label: "C", seat_number: 7, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 24, row_label: "C", seat_number: 8, seat_type: "STANDARD", is_active: true, isBooked: false },

  // Row D
  { id: 25, row_label: "D", seat_number: 1, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 26, row_label: "D", seat_number: 2, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 27, row_label: "D", seat_number: 3, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 28, row_label: "D", seat_number: 4, seat_type: "VIP", is_active: true, isBooked: false },
  { id: 29, row_label: "D", seat_number: 5, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 30, row_label: "D", seat_number: 6, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 31, row_label: "D", seat_number: 7, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 32, row_label: "D", seat_number: 8, seat_type: "STANDARD", is_active: true, isBooked: false },

  // Row E
  { id: 33, row_label: "E", seat_number: 1, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 34, row_label: "E", seat_number: 2, seat_type: "VIP", is_active: true, isBooked: false },
  { id: 35, row_label: "E", seat_number: 3, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 36, row_label: "E", seat_number: 4, seat_type: "STANDARD", is_active: true, isBooked: true },
  { id: 37, row_label: "E", seat_number: 5, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 38, row_label: "E", seat_number: 6, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 39, row_label: "E", seat_number: 7, seat_type: "VIP", is_active: true, isBooked: false },
  { id: 40, row_label: "E", seat_number: 8, seat_type: "STANDARD", is_active: true, isBooked: false },

  // Row F
  { id: 41, row_label: "F", seat_number: 1, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 42, row_label: "F", seat_number: 2, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 43, row_label: "F", seat_number: 3, seat_type: "VIP", is_active: true, isBooked: false },
  { id: 44, row_label: "F", seat_number: 4, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 45, row_label: "F", seat_number: 5, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 46, row_label: "F", seat_number: 6, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 47, row_label: "F", seat_number: 7, seat_type: "STANDARD", is_active: true, isBooked: false },
  { id: 48, row_label: "F", seat_number: 8, seat_type: "VIP", is_active: true, isBooked: true },
];

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Nhóm ghế theo hàng
  const rows = seats.reduce((acc, seat) => {
    if (!acc[seat.row_label]) acc[seat.row_label] = [];
    acc[seat.row_label].push(seat);
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
            <div className="bg-gray-300 h-3 w-2/3 rounded"></div>
          </div>

          <div className="space-y-3">
            {Object.entries(rows).map(([rowLabel, rowSeats]) => (
              <div key={rowLabel} className="flex justify-center gap-2">
                {/* <span className="w-6 font-bold">{rowLabel}</span> */}
                {rowSeats.map((seat) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  const seatClasses = seat.is_active
                    ? seat.isBooked
                      ? "bg-gray-500 cursor-not-allowed text-white pointer-events-none"
                      : isSelected
                      ? "bg-orange-500 text-white"
                      : seat.seat_type === "VIP"
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : "bg-green-200 hover:bg-green-300"
                    : "bg-gray-200 cursor-not-allowed";

                  return (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeat(seat.id)}
                      disabled={!seat.is_active || seat.isBooked}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-xs sm:text-sm font-semibold ${seatClasses}`}
                    >
                      {seat.row_label + seat.seat_number}
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
                    return s ? `${s.row_label}${s.seat_number}` : "";
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

export default SeatBooking;
