import { createContext, useState, useEffect, type ReactNode, useCallback  } from "react";
import type { AuthContextType } from "./authContextType";
import { authStorage } from "@/features/auth/storage/authStorage";
import type { AuthResponse } from "@/features/auth/dtos/authResponse";
import type { User } from "@/features/auth/dtos/user";

export const AuthContext = 
  createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (data: AuthResponse) => {
    const user: User = data;
    const token = data.token!;

    setUser(user);
    setToken(token);

    authStorage.setUser(user);
    authStorage.setToken(token);
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);

    authStorage.removeToken();
    authStorage.removeUser();
  }, []);

  useEffect(() => {
    const storedToken = authStorage.getToken();
    const storedUser = authStorage.getUser();

    if (storedToken && storedUser){
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
