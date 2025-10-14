import type { AuthResponse, LoginPayload, RegisterPayload } from "@/app/providers/auth/AuthTypes";
import api from "@/lib/api/axiosInstance";

export const AuthService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post("/Auth/login", payload);
    return response?.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post("/Auth/register", payload);

    return response?.data;
  }
};
