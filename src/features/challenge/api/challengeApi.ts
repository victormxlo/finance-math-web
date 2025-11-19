import api from "@/lib/api/axiosInstance";
import type { ChallengeDTO } from "../dtos/challengeDto";
import type { UserChallengeProgressDTO } from "../dtos/userChallengeProgressDto";

export const challengeApi = {
  getAll(active?: boolean): Promise<ChallengeDTO[]> {
    return api.get(`/challenges?active=${active ?? false}`).then(res => res.data);
  },

  getById(id: string): Promise<ChallengeDTO> {
    return api.get(`/challenges/${id}`).then(res => res.data);
  },

  getProgress(userId: string): Promise<UserChallengeProgressDTO[]> {
    return api
      .get(`/challenges/${userId}/progress`)
      .then(res => res.data);
  },
};
