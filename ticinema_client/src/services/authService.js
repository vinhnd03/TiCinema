import api from "../api/api";

const URL = "/auth";

const login = async (obj) => {
    try {
        const resp = await api.post(`${URL}/login`, obj);
        return resp.data;
    } catch (error) {
        console.log(error);
        if (error.response) {
            return error.response.data;
        }
        return {
            success: false
        }
    }
}

const register = async (obj) => {
    try {
        const resp = await api.post(`${URL}/register`, obj);
        return resp.data;
    } catch (error) {
        console.log(error);
        if (error.response) {
            return error.response.data;
        }

        return {
            success: false
        }
    }
}

const logout = async () => {
    try {
        await api.post(`${URL}/logout`, {});
        return { success: true };
    } catch (error) {
        console.error("Lỗi khi logout:", error);
        return { success: false, error: "Logout thất bại" };
    }
};

export default { login, register, logout }