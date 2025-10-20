import { STORAGE_KEYS } from "@/lib/constants/storageKeys";


export const authStorage = {
  getUser(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.USER);
    } catch {
      return null;
    }
  },
  setUser(value: any) {
    try {
      const jsonValue = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(STORAGE_KEYS.USER, jsonValue);
    } catch {}
  },
  removeUser() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch {}
  },

  getToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    } catch {
      return null;
    }
  },
  setToken(value: string) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_TOKEN, value);
    } catch {}
  },
  removeToken() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    } catch {}
  },
};
