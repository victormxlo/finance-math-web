import api from "@/lib/api/axiosInstance";
import type { GamificationProfileDTO } from "../dtos/gamificationProfileDto";
import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";

export const gamificationApi = {
  getProfile(userId: string): Promise<GamificationProfileDTO> {
    return api.get(`/gamificationprofiles/${userId}`)
      .then(res => res.data);
  },

  changeUsername(userId: string, newUsername: string): Promise<boolean> {
    return api.post(`/users/${userId}/change-username`, { newUsername: newUsername })
      .then(res => res.data);
  },

  changePassword(userId: string, current: string, next: string): Promise<boolean> {
    return api.post(`/users/${userId}/change-password`, { currentPassword: current, newPassword: next })
      .then(res => res.data);
  },

  getUserAchievements(userId: string): Promise<AchievementDTO[]> {
    return api.get(`gamificationprofiles/${userId}/achievements`)
      .then(res => res.data);
  },

  createProfile(userId: string): Promise<GamificationProfileDTO> {
    return api.post("/gamificationprofiles", { userId: userId, levelId: 1 })
      .then(res => res.data);
  },
};
