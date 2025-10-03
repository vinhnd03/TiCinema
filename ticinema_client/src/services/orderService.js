import api from "../api/api";

const URL = "/order";

const selectSeat = async (seatId, userId) => {
    try {
        const resp = await api.post(`${URL}/select-seat/${seatId}/${userId}/select`);
        console.log("đã chọn ghế ", seatId);
        return resp.data.success;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deselectSeat = async (seatId) => {
    try {
        const resp = await api.post(`${URL}/select-seat/${seatId}/deselect`);
        console.log("đã hủy chọn ghế ", seatId);
        return resp.data.success;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const cancelAllSeat = async (showtimeId, userId) => {
    try {
        const resp = await api.post(`${URL}/cancel-all/${showtimeId}/${userId}`);
        return resp.data.success;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const cancelAllSeatBeacon = (showtimeId, userId) => {
  return navigator.sendBeacon(
    `${URL}/cancel-all/${showtimeId}/${userId}`,
    JSON.stringify({})
  );
};

export default {selectSeat, deselectSeat, cancelAllSeat, cancelAllSeatBeacon} 


