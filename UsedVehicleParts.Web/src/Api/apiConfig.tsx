import axios, { AxiosRequestConfig, AxiosError } from "axios";

import { BaseUrl } from "./api";

axios.defaults.baseURL = BaseUrl;

const api = axios.create();

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("token");
    }

    return error;
  }
);

export default api;
