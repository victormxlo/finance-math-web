import type { ChallengeDTO } from "@/features/challenge/dtos/challengeDto";

export const mockChallenges: ChallengeDTO[] = [
  {
    id: "c1",
    name: "Complete 3 contents",
    description: "Complete 3 different contents to earn XP and coins.",
    criteriaKey: "complete_n_contents:3",
    target: 3,
    experienceReward: 100,
    virtualCurrencyReward: 20,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 27).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "c2",
    name: "Complete 5 exercises",
    description: "Solve 5 exercises to level up your skills.",
    criteriaKey: "complete_n_exercises:5",
    target: 5,
    experienceReward: 200,
    virtualCurrencyReward: 50,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    createdAt: new Date().toISOString(),
  },
];