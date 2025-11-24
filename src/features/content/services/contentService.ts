import { contentApi } from "../api/contentApi";
import type { CompleteContentResponseDTO } from "../dtos/completeContentResponseDto";
import type { ContentDTO } from "../dtos/contentDto";
import type { ContentSectionDTO } from "../dtos/contentSectionDto";
import type { UserContentProgressDTO } from "../dtos/userContentProgressDto";

export const contentService = {
  getAll(): Promise<ContentDTO[]> {
    return contentApi.getAll();
  },

  getById(contentId: string): Promise<ContentDTO> {
    return contentApi.getContentById(contentId);
  },

  getSections(contentId: string): Promise<ContentSectionDTO[]> {
    return contentApi.getSections(contentId);
  },

  getUserProgress(userId: string): Promise<UserContentProgressDTO[]> {
    return contentApi.getUserProgress(userId);
  },

  completeContent(contentId: string, userId: string): Promise<CompleteContentResponseDTO> {
    return contentApi.completeContent(contentId, userId);
  },
};