import { createContext, useState, useEffect, useCallback, useMemo  } from "react";
import { authStorage } from "@/features/auth/storage/authStorage";
import type { AuthResponse } from "@/features/auth/dtos/authResponse";
import type { UserDTO } from "@/features/auth/dtos/userDto";
import { useLoading } from "@/app/hooks/useLoading";
import { AuthService } from "../services/authService";
import { mapApiError } from "@/lib/api/apiErrorMapper";
import type { RegisterPayload } from "../dtos/registerPayload";
import type { LoginPayload } from "../dtos/loginPayload";
import { gamificationService } from "@/features/gamification/services/gamificationService";

export interface AuthContextType {
  user: UserDTO | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const { showLoading, hideLoading } = useLoading();

  const login = useCallback(async (payload: LoginPayload) => {
    showLoading();
    try {
      const response = await AuthService.login(payload);
      const userData = response as unknown as UserDTO;
      const accessToken = (response as any).token as string | undefined;

      setUser(userData);
      setToken(accessToken ?? null);

      if (accessToken) authStorage.setToken(accessToken);
      if (userData) authStorage.setUser(userData);

      return response;
    } catch (err: any) {
      throw mapApiError(err);
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  const register = useCallback(async (payload: RegisterPayload) => {
    showLoading();
    try {
      const response = await AuthService.register(payload);
      const userData = response as unknown as UserDTO;
      const accessToken = (response as any).token as string | undefined;

      setUser(userData);
      setToken(accessToken ?? null);

      if (accessToken) authStorage.setToken(accessToken);
      if (userData) authStorage.setUser(userData);

      if (userData?.id) {
        (async () => {
          try {
            await gamificationService.createProfile(userData.id);
          } catch (e: any) {
            console.error("Falha ao criar perfil de usuário");
            throw mapApiError(e);
          }
        })();
      };

      return response;
    } catch (err: any) {
      throw mapApiError(err);
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    authStorage.removeToken();
    authStorage.removeUser();
  }, []);

  useEffect(() => {
    const initialize = async () => {
      showLoading();
      try {
        const storedToken = authStorage.getToken();
        const storedUser = authStorage.getUser();

        if (storedToken) setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            authStorage.removeUser();
          }
        }
      } finally {
        setIsInitializing(false);
        hideLoading();
      }
    };

    initialize();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isInitializing,
      login,
      register,
      logout,
    }),
    [user, token, isInitializing, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
