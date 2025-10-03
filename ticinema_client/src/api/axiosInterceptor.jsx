// src/axiosInterceptor.js
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const errorHandler = useCallback(
    (error) => {
      const status = error.response?.status;

      if (status === 401) {
        logout();
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
        navigate("/login", { replace: true });
        return Promise.resolve();
      }

      return Promise.reject(error);
    },
    [logout, navigate]
  );

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      errorHandler
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [errorHandler]);
};
