import { authApi } from "@/features/auth/api/authApi";
import { mapApiError } from "@/lib/api/apiErrorMapper";
import type { LoginPayload } from "@/features/auth/dtos/loginPayload";
import type { RegisterPayload } from "@/features/auth/dtos/registerPayload";

export const AuthService = {
  async login(payload: LoginPayload) {
    try {
      const response = await authApi.login(payload);
      return response;
    } catch (error: any) {
      throw mapApiError(error);
    }
  },

  async register(payload: RegisterPayload) {
    try {
      const response = authApi.register(payload);
      return response;
    } catch (error: any) {
      throw mapApiError(error);
    }
  }
};
