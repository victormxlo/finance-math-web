import type { AuthResponse, LoginPayload, RegisterPayload } from "@/app/providers/auth/AuthTypes";
import api from "@/lib/api/axiosInstance";

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  const response = await api.post("/Auth/login", payload);
  return response.data;
};

export async function registerApi(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await api.post("/Auth/register", payload);
  return response.data;
};
