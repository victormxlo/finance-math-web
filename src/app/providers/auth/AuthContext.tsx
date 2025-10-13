import { createContext, useState, useEffect, type ReactNode, useCallback  } from "react";
import type { AuthContextType, AuthUser } from "./AuthTypes";
import { authStorage } from "./authStorage";
import api from "@/lib/api/axiosInstance";

export const AuthContext = 
  createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = authStorage.getUser();
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return authStorage.getToken();
    } catch {
      return null;
    }
  });

  const register = async (fullName: string, username: string, email: string, password: string) => {
    // API call
    const fakeUser: AuthUser = {
      id: "1",
      username: username,
      email,
      role: "User",
      token: "fake-token"
    };

    setUser(fakeUser);
    setToken(fakeUser.token || null);

    authStorage.setUser(JSON.stringify(fakeUser));
    authStorage.setToken(fakeUser.token || "");
  };

  const login = async (email: string, password: string) => {
    // API call
    const fakeUser: AuthUser = {
      id: "1",
      username: "John Doe",
      email,
      role: "User",
      token: "fake-token"
    };

    setUser(fakeUser);
    setToken(fakeUser.token || null);

    authStorage.setUser(JSON.stringify(fakeUser));
    authStorage.setToken(fakeUser.token || "");
  };

  const setAuth = useCallback((nextUser: AuthUser | null, nextToken: string | null = null) => {
    setUser(nextUser);
    setToken(nextToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);

    authStorage.removeToken();
    authStorage.removeUser();
  }, []);

  useEffect(() => {
    if (user) {
      try {
        authStorage.setUser(JSON.stringify(user));
      } catch {}
    } else {
      authStorage.removeUser();
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      try {
        authStorage.setToken(token);
      } catch {}
      try {
        api.defaults.headers.common = api.defaults.headers.common || {};
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      } catch {}
    } else {
      authStorage.removeToken();
      try {
        if (api.defaults.headers?.common) {
          delete api.defaults.headers.common.Authorization;
        }
      } catch {}
    }
  }, [token]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    setAuth,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
