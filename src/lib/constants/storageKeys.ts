export const STORAGE_KEYS = {
  USER: "numera_user",
  USER_TOKEN: "numera_user_token"
} as const;

export type StorageKeys = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
