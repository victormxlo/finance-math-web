import api from "@/lib/api/axiosInstance";
import type { AchievementDTO } from "../dtos/achievementDto";
import type { UserAchievementDTO } from "../dtos/userAchievementDto";

export const achievementApi = {
  getAll(): Promise<AchievementDTO[]> {
    return api.get("/achievements").then(res => res.data);
  },

  getUserProgress(userId: string): Promise<UserAchievementDTO[]> {
    return api.get(`/achievements/${userId}/progress`).then(res => res.data);
  },
};
