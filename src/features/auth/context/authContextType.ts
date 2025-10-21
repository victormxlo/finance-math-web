import type { UserDTO } from "@/features/auth/dtos/userDto";
import type { AuthResponse } from "@/features/auth/dtos/authResponse";

export interface AuthContextType {
  user: UserDTO | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (auth: AuthResponse) => void;
  logout: () => void;
};

