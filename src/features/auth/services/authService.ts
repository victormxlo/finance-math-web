import type { LoginPayload, RegisterPayload } from "@/app/providers/auth/AuthTypes";
import { loginApi, registerApi } from "../api/authApi";
import { mapApiError } from "@/lib/api/apiErrorMapper";

export const AuthService = {
  async login(payload: LoginPayload) {
    try {
      const response = await loginApi(payload);
      return response;
    } catch (error: any) {
      throw mapApiError(error);
    }
  },

  async register(payload: RegisterPayload) {
    try {
      const response = await registerApi(payload);
      return response;
    } catch (error: any) {
      throw mapApiError(error);
    }
  }
};
