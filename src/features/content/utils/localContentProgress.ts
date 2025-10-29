import { STORAGE_KEYS } from "@/lib/constants/storageKeys";

export interface LocalContentProgress {
  completedSectionIds: string[];
  updatedAt: string; // ISO
};

const keyFor = (contentId: string) => `${STORAGE_KEYS.USER_CONTENT_PROGRESS}:${contentId}`;

export const writeLocalProgress = (contentId: string, progress: LocalContentProgress) => {
  try {
    localStorage.setItem(keyFor(contentId), JSON.stringify(progress));
  } catch { }
};

export const readLocalProgress = (contentId: string): LocalContentProgress | null => {
  if (!contentId) return null;
  try {
    const raw = localStorage.getItem(keyFor(contentId));
    if (!raw) return null;
    return JSON.parse(raw) as LocalContentProgress;
  } catch {
    return null;
  }
};

export const clearLocalProgress = (contentId: string) => {
  try {
    localStorage.removeItem(keyFor(contentId));
  } catch {}
};