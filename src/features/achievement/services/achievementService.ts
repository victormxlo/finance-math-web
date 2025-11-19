import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import type { UserAchievementDTO } from "@/features/achievement/dtos/userAchievementDto";
import { achievementApi } from "../api/achievementApi";

export const achievementService = {
  getAll(): Promise<AchievementDTO[]> {
    return achievementApi.getAll();
  },

  getProgress(userId: string): Promise<UserAchievementDTO[]> {
    return achievementApi.getUserProgress(userId);
  }
};
