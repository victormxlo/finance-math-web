import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import type { UserAchievementDTO } from "@/features/achievement/dtos/userAchievementDto";

export const achievementsMock: AchievementDTO[] = [
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
    id: "32f4567a-1b55-4af7-98b9-123fbc71d101",
    name: "Content Explorer",
    description: "Complete 3 learning contents.",
    criteriaKey: "complete_n_contents:3",
    experienceReward: 150,
    virtualCurrencyReward: 80,
    createdAt: "2025-10-09T12:23:11.507812",
  },
  {
    id: "77f222ab-941c-41e7-a38a-0c23f82cfa45",
    name: "Daily Streak - 5 Days",
    description: "Log in and complete tasks for 5 consecutive days.",
    criteriaKey: "streak_days:5",
    experienceReward: 200,
    virtualCurrencyReward: 100,
    createdAt: "2025-10-10T09:02:14.422311",
  },
  {
    id: "992b17c4-85ce-4122-9a1e-f83f589a82e0",
    name: "First Steps",
    description: "Complete your first exercise.",
    criteriaKey: "first_exercise_completed",
    experienceReward: 50,
    virtualCurrencyReward: 25,
    createdAt: "2025-10-05T15:54:57.108401",
  },
  {
    id: "8887cde5-fb44-49b2-b311-18eec331b4dd",
    name: "Dedicated Student",
    description: "Complete 10 exercises. True mastery requires practice.",
    criteriaKey: "complete_n_exercises:10",
    experienceReward: 400,
    virtualCurrencyReward: 150,
    createdAt: "2025-10-11T08:54:57.108401",
  },
];

export const achievementProgressMock: UserAchievementDTO[] = [
  {
    profileId: "c575c539-a3db-4058-bc56-e762a85971d8",
    userId: "88b8afb9-2080-48f8-a6be-622067876fc5",
    achievementId: "04bcbd05-fb79-45b0-bc90-3cf931a2d926",
    achievementName: "Exercise Apprentice",
    criteriaKey: "complete_n_exercises:2",
    unlockedAt: "2025-10-07T11:13:27.836945",
  },
  {
    profileId: "c575c539-a3db-4058-bc56-e762a85971d8",
    userId: "88b8afb9-2080-48f8-a6be-622067876fc5",
    achievementId: "992b17c4-85ce-4122-9a1e-f83f589a82e0",
    achievementName: "First Steps",
    criteriaKey: "first_exercise_completed",
    unlockedAt: "2025-10-05T16:22:57.836945",
  },
];