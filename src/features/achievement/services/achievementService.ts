import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import type { UserAchievementDTO } from "@/features/achievement/dtos/userAchievementDto";
import { achievementProgressMock, achievementsMock } from "@/features/achievement/mocks/mockAchievements";

export const achievementService = {
  async getAll(): Promise<AchievementDTO[]> {
    return new Promise((resolve) => setTimeout(() => resolve(achievementsMock), 600));
  },

  async getUserProgress(userId: string): Promise<UserAchievementDTO[]> {
    return new Promise((resolve) => 
      setTimeout(() =>
        resolve(
          achievementProgressMock.filter((p) => p.userId === userId)
        ), 
      600
      )
    )
  }
};
