import { refreshToken } from "@/api/auth/fetch";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// TODO handle multiple requests
axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error) {
    const originalRequest = error.config;

    const responseStatus = (error?.response?.status || error?.status) as
      | number
      | undefined;
    const isUnauthorized = responseStatus === 401;
    const wasRequestRetried = !!originalRequest._retried;

    if (isUnauthorized && !wasRequestRetried) {
      originalRequest._retried = true;
      await refreshToken();
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
