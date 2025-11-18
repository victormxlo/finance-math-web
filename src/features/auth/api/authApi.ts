import api from "@/lib/api/axiosInstance";
import type { LoginPayload } from "@/features/auth/dtos/loginPayload";
import type { RegisterPayload } from "@/features/auth/dtos/registerPayload";
import type { AuthResponse } from "@/features/auth/dtos/authResponse";

export const authApi = {
  login(payload: LoginPayload): Promise<AuthResponse> {
    return api.post("/Auth/login", payload).then(res => res.data);
  },

  register(payload: RegisterPayload): Promise<AuthResponse> {
    return api.post("/Auth/register", payload).then(res => res.data);
  },
};
