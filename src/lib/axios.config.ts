import { refreshToken } from "@/api/auth/fetch";
import axios from "axios";
import { setIsLoggedIn } from "./local-storage-helpers";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


const queue: { reject: (error: unknown) => unknown, resolve: (token?: string) => string | unknown; }[] = [];
let isRefreshing = false;


const processQueue = (error: unknown, token?: string) => {
  queue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  queue.length = 0;
};

axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error,) {
    const originalRequest = error.config;
    if (!originalRequest || originalRequest?.skipInterceptor) {
      return Promise.reject(error);
    }

    const responseStatus = (error?.response?.status || error?.status) as
      | number
      | undefined;
    const isUnauthorized = responseStatus === 401;
    const wasRequestRetried = !!originalRequest._retried;
    const wasRequestRefreshRoute = originalRequest?.url === "/auth/refresh";
    if (!isUnauthorized) {
      return Promise.reject(error);
    }
    if (!wasRequestRetried && !wasRequestRefreshRoute) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          return queue.push({ resolve, reject });
        }).then(() => {
          return axiosInstance(originalRequest);
        }).catch((e) => Promise.reject(e));
      }
      isRefreshing = true;
      originalRequest._retried = true;

      try {
        return new Promise((resolve, reject) => {
          refreshToken().then(() => {
            processQueue(null);
            return resolve(axiosInstance(originalRequest));
          }).catch(e => {
            isRefreshing = false;
            processQueue(e);
            reject(e);
          }).then(() => {
            isRefreshing = false;
          });

        });
      } catch (e) {
        isRefreshing = false;
        processQueue(e);
        setIsLoggedIn(false);
        return Promise.reject(e);
      }
    } else {
      setIsLoggedIn(false);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
