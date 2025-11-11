import type { GamificationProfileDTO } from "../dtos/gamificationProfileDto";

export const mockProfiles: GamificationProfileDTO[] = [
  {
    userId: "88b8afb9-2080-48f8-a6be-622067876fc5",
    username: "scottmescudi",
    levelId: 1,
    levelName: "Financial Intern",
    experiencePoints: 320,
    virtualCurrency: 120,
    currentStreakDays: 1,
    lastActivityDate: "2025-10-07T11:13:02.618102",
    achievementsIds: ["04bcbd05-fb79-45b0-bc90-3cf931a2d926"],
    challengeProgressesIds: ["38537302-af17-4aa2-8988-d2faf6628616"],
  },
  {
    userId: "user-2",
    username: "mrrager",
    levelId: 2,
    levelName: "Financial Junior",
    experiencePoints: 820,
    virtualCurrency: 340,
    currentStreakDays: 4,
    lastActivityDate: new Date().toISOString(),
    achievementsIds: [],
    challengeProgressesIds: [],
  },
];
