import type { User } from "@/features/auth/dtos/user";
import type { AuthResponse } from "@/features/auth/dtos/authResponse";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (auth: AuthResponse) => void;
  logout: () => void;
};

