import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import orderService from "../services/orderService";
import usePrompt from "./useBlocker";

const useSeatGuard = (showtimeId, userId, selectedSeats) =>  {
  const location = useLocation();
  const message = "Bạn có chắc chắn muốn rời khỏi trang? Ghế đang chọn sẽ bị hủy!";

  const handleCancelSeats = () => {
    if (selectedSeats.length > 0) {
      orderService.cancelAllSeatBeacon(showtimeId, userId);
    }
  };

  // Chặn chuyển route trong React Router (SPA)
  usePrompt(
    message,
    selectedSeats.length > 0 && !location.pathname.startsWith("/checkout"),
    handleCancelSeats
  );

  // Chặn reload / đóng tab (dùng beacon)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (selectedSeats.length > 0) {
        orderService.cancelAllSeatBeacon(showtimeId, userId);

        e.preventDefault();
        e.returnValue = message; // message hiển thị sẽ bị browser override
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [selectedSeats, showtimeId, userId, message]);
}

export default useSeatGuard;
