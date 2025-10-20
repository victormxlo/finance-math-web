import api from "@/lib/api/axiosInstance";
import type { LoginPayload } from "@/features/auth/dtos/loginPayload";
import type { RegisterPayload } from "@/features/auth/dtos/registerPayload";
import type { AuthResponse } from "@/features/auth/dtos/authResponse";

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  const response = await api.post("/Auth/login", payload);
  return response.data;
};

export async function registerApi(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await api.post("/Auth/register", payload);
  return response.data;
};
