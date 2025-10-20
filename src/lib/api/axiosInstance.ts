import axios from "axios";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { authStorage } from "@/features/auth/storage/authStorage";
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
      toast.error("Session expired. Log in again.");

      authStorage.removeUser();
      authStorage.removeToken();

      window.location.href = "/auth";
    }
    else if (error?.response?.status === 403) {
      toast.error("You do not have permission to access this resource.");
    }
    else if (error?.response?.status === 500) {
      toast.error("Internal server error. Please try again later.");
    }
    else {
      toast.error(error?.response?.data?.message);
    }

    return Promise.reject(error);
  }
);

export default api;
