import type { UserChallengeProgressDTO } from "@/features/challenge/dtos/userChallengeProgressDto";

export const mockUserProgress: UserChallengeProgressDTO[] = [
  {
    profileId: "pf-1",
    userId: "88b8afb9-2080-48f8-a6be-622067876fc5",
    challengeId: "c1",
    challengeName: "Complete 3 contents",
    challengeDescription: "Complete 3 different contents to earn XP and coins.",
    criteriaKey: "complete_n_contents:3",
    currentProgress: 1,
    targetProgress: 3,
    isCompleted: false,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    completedAt: null,
  },
];