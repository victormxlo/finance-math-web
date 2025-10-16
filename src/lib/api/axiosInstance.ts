import axios from "axios";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { authStorage } from "@/app/providers/auth/authStorage";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
      console.warn("Unauthorized access.");
      toast.error("Session expired. Log in again.");

      authStorage.removeUser();
      authStorage.removeToken();

      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;
