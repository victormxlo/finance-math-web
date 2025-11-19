import { gamificationApi } from "../api/gamificationApi";
import type { GamificationProfileDTO } from "../dtos/gamificationProfileDto";

export const gamificationService = {
   getProfile(userId: string): Promise<GamificationProfileDTO | null> {
    return gamificationApi.getProfile(userId);
  },

  changeUsername(userId: string, newUsername: string): Promise<boolean> {
    return gamificationApi.changeUsername(userId, newUsername);
  },

  changePassword(userId: string, current: string, next: string): Promise<boolean> {
    return gamificationApi.changePassword(userId, current, next);
  },

  getUserAchievements(userId: string) {
    return gamificationApi.getUserAchievements(userId);
  },

  createProfile(userId: string): Promise<GamificationProfileDTO> {
    return gamificationApi.createProfile(userId);
  },
};
