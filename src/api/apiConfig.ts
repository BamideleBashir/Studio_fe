// configure axios for api calls
import axios from "axios";

// export const API_URL_RAW = "https://spaceweb.io";
export const API_URL_RAW =
  import.meta.env.VITE_APP_API_URL_RAW ||
  "https://binoculebackend-production.up.railway.app";

const api = axios.create({
  baseURL: `${API_URL_RAW}/api/v1`,
});

// api.defaults.withCredentials = true;

// add token to request header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
