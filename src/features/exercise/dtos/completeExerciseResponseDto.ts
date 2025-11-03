import type { UserAchievementDTO } from "@/features/achievement/dtos/userAchievementDto";
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
  achievementsUnlocked?: UserAchievementDTO[];
  challengesProgress?: UserChallengeProgressDTO[];
  nextRecommended?: RecommendedItemDTO[];
};
