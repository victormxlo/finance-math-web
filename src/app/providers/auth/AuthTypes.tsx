export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  type: "Admin" | "Student";
  createdAt: string;
  token?: string;
};

export interface RegisterPayload {
  username: string;
  fullName: string;
  email: string;
  password: string;
  type: number;
};

export interface LoginPayload {
  email: string;
  password: string;
};

export interface AuthResponse extends User { }

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (auth: AuthResponse) => void;
  logout: () => void;
};

