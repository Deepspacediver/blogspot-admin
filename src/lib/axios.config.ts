import { refreshToken } from "@/api/auth/fetch";
import axios from "axios";
import { setIsLoggedIn } from "./local-storage-helpers";

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
    const wasRequestRefreshRoute = originalRequest?.url === "/auth/refresh";

    if (isUnauthorized && !wasRequestRetried && !wasRequestRefreshRoute) {
      originalRequest._retried = true;
      try {
        await refreshToken();
      } catch {
        setIsLoggedIn(false);
        return Promise.reject(error);
      }
      return axiosInstance(originalRequest);
    } else {
      setIsLoggedIn(false);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
