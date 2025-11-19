import type { ChallengeDTO } from "@/features/challenge/dtos/challengeDto";
import type { UserChallengeProgressDTO } from "@/features/challenge/dtos/userChallengeProgressDto";
import { challengeApi } from "../api/challengeApi";

export const challengeService = {
  getAll(active?: boolean | null): Promise<ChallengeDTO[]> {
      return challengeApi.getAll(active ?? false);
  },

  getById(id: string): Promise<ChallengeDTO> {
    return challengeApi.getById(id);
  },

  getProgress(userId: string): Promise<UserChallengeProgressDTO[]> {
    return challengeApi.getProgress(userId);
  },
};
