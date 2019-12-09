import axios, { AxiosRequestConfig, AxiosError } from "axios";

import { BaseUrl } from "./api";

import history from "../Constants/history";
import routes from "../Constants/routes";

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
      history.push(routes.login);
    }

    return Promise.reject(error);
  }
);

export default api;
