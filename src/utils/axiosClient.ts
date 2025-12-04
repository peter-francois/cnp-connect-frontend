import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { HttpStatusCode } from "axios";

interface AxiosRequestWithRetry extends AxiosRequestConfig {
  _retry: boolean | undefined;
}

export const axiosClient = () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-control-Allow-Origin": "*",
  };

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers,
  });

  // interceptors for request to add accessToken if it existe in localStorage
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  // interceptors for response handle http errors
  api.interceptors.response.use(
    // if response is successful
    (res: AxiosResponse): AxiosResponse => {
      return res;
    },

    // if response is rejected
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestWithRetry;

      // prevent infinit loops with refresh token
      if (originalRequest._retry) {
        // tu n'a pas accés a cette resource
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (error.response?.status === HttpStatusCode.Unauthorized) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
            {},
            { withCredentials: true }
          );

          localStorage.setItem("accessToken", data.data.accessToken);
        } catch {
          localStorage.clear();
          window.location.href = "/";
        }

        return api(originalRequest);
      }
      // @dev don't send if conflict
      window.location.href = "/page-erreur";
    }
  );

  return api;
};
