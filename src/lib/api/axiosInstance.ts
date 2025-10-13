import axios from "axios";
import { STORAGE_KEYS } from "../constants/storageKeys";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "",
  timeout: 10000
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);

    if (token){
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error(`Failed to insert auth token in request headers: ${error}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Handle unauthorized access, e.g., redirect to login page
      console.warn("Unauthorized access - perhaps redirect to login?");
    }
    return Promise.reject(error);
  }
);

export default api;
