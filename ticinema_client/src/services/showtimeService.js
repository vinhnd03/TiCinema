import api from "../api/api";


const URL = "/showtime";

const loadSeatByMovieId = async (movieId) => {
    try {
        const resp = await api.get(`${URL}/${movieId}/seats`);
        return resp.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default {loadSeatByMovieId};