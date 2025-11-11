import type { GamificationProfileDTO } from "../dtos/gamificationProfileDto";
import { mockProfiles } from "../mocks/mockProfiles";

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const gamificationService = {
  async getProfile(userId: string): Promise<GamificationProfileDTO | null> {
    await wait();
    const profile = mockProfiles.find((p) => p.userId === userId) ?? null;
    return profile ? { ...profile } : null;
  },

  async changeUsername(userId: string, newUsername: string): Promise<boolean> {
    await wait();
    const idx = mockProfiles.findIndex((p) => p.userId === userId);

    if (idx === -1) return false;
    mockProfiles[idx] = { ...mockProfiles[idx], username: newUsername };
    return true;
  },

  async changePassword(userId: string, current: string, next: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 700));
    if (!current || !next) return false;
    return true;
  },

  async getUserAchievements(userId: string) {
    await new Promise((res) => setTimeout(res, 500));
    return [
      {
        id: "04bcbd05-fb79-45b0-bc90-3cf931a2d926",
        name: "Exercise Apprentice",
        description: "Complete 2 exercises to prove your consistency.",
        criteriaKey: "complete_n_exercises:2",
        experienceReward: 100,
        virtualCurrencyReward: 50,
        createdAt: "2025-10-07T10:54:57.108401",
      },
      {
        id: "77ac924b-b8e4-4b3d-bcb9-812b38f3dbb1",
        name: "Daily Streaker",
        description: "Maintain a 3-day learning streak.",
        criteriaKey: "streak_days:3",
        experienceReward: 150,
        virtualCurrencyReward: 75,
        createdAt: "2025-10-08T09:00:00.000000",
      },
    ];
  },
};
