import type { UserType } from "@/types/user";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserType;
  token?: string;
};

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (nextUser: AuthUser | null, nextToken?: string | null) => void;
  register: (fullName: string, username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

