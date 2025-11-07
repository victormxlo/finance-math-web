import type { ChallengeDTO } from "@/features/challenge/dtos/challengeDto";
import type { UserChallengeProgressDTO } from "@/features/challenge/dtos/userChallengeProgressDto";
import { mockChallenges } from "@/features/challenge/mocks/mockChallenges";
import { mockUserProgress } from "@/features/challenge/mocks/mockUserProgress";

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const challengeService = {
  async getAll(active?: boolean | null): Promise<ChallengeDTO[]> {
    await wait(300);
    if (typeof active === "boolean") {
      const now = Date.now();
      return mockChallenges.filter((c) => {
        const start = Date.parse(c.startDate);
        const end = Date.parse(c.endDate);
        const isActive = start <= now && now <= end;
        return active ? isActive : !isActive;
      });
    }
    return [...mockChallenges];
  },

  async getById(id: string): Promise<ChallengeDTO> {
    await wait(200);
    const found = mockChallenges.find((c) => c.id === id);
    if (!found) throw new Error("Challenge not found (mock)");
    return { ...found };
  },

  async getProgress(userId: string): Promise<UserChallengeProgressDTO[]> {
    await wait(250);
    if (!userId) return [];
    return mockUserProgress.filter((p) => p.userId === userId).map((p) => ({ ...p }));
  },
};
