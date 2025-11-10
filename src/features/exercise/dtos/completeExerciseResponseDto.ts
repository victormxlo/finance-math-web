import type { UserAchievementUnlockedDTO } from "@/features/achievement/dtos/userAchievementUnlockedDto";
import type { UserChallengeProgressDTO } from "@/features/challenge/dtos/userChallengeProgressDto";
import type { RewardDTO } from "@/features/gamification/dtos/rewardDto";
import type { RecommendedItemDTO } from "@/features/gamification/recommendedItemDto";
import type { GamificationProfileSummaryDTO } from "@/features/profile/dtos/gamificationProfileSummaryDto";

export interface CompleteExerciseResponseDTO {
  exerciseId: string;
  isCorrect: boolean;
  usedHint: boolean;
  explanation?: string;
  alreadyCompleted: boolean;
  reward?: RewardDTO;
  profile?: GamificationProfileSummaryDTO;
  completedAtUtc?: string;
  achievementsUnlocked?: UserAchievementUnlockedDTO[];
  challengesProgress?: UserChallengeProgressDTO[];
  nextRecommended?: RecommendedItemDTO[];
};
