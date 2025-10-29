import type { CompleteContentResponseDTO } from "../dtos/completeContentResponseDto";
import type { ContentDTO } from "../dtos/contentDto";
import type { ContentSectionDTO } from "../dtos/contentSectionDto";
import type { UserContentProgressDTO } from "../dtos/userContentProgressDto";
import { mockContent, mockSections, mockProgress, mockCompleteResponse } from "../mocks/mockContents";

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const contentService = {
  async getById(contentId: string): Promise<ContentDTO> {
    await wait(250);
    if (contentId === mockContent.id) return { ...mockContent };

    throw new Error("Content not found (mock)");
  },

  async getSections(contentId: string): Promise<ContentSectionDTO[]> {
    await wait(200);
    if (contentId === mockContent.id) {
      return [...mockSections].sort((a, b) => a.order - b.order);
    }
    return [];
  },

  async getUserProgress(userId: string): Promise<UserContentProgressDTO[]> {
    await wait(120);
    if (!userId) return [];
    return userId === "user-1" ? [...mockProgress] : [];
  },

  async completeContent(contentId: string): Promise<CompleteContentResponseDTO> {
    await wait(300);
    if (contentId === mockContent.id) {
      return { ...mockCompleteResponse };
    }
    return {
      contentId,
      moduleCompleted: false,
      reward: {},
      profile: {},
      achievementsUnlocked: [],
      completedAtUtc: new Date().toISOString(),
      challengesProgress: [],
      nextRecommended: [],
    };
  },
};
