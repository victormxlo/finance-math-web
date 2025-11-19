import api from "@/lib/api/axiosInstance";
import type { UserContentProgressDTO } from "../dtos/userContentProgressDto";
import type { CompleteContentResponseDTO } from "../dtos/completeContentResponseDto";
import type { ContentDTO } from "../dtos/contentDto";
import type { ContentSectionDTO } from "../dtos/contentSectionDto";

export const contentApi = {
  async getAll(): Promise<ContentDTO[]> {
    return api.get("/contents").then(res => res.data);
  },

  async getContentById(contentId: string): Promise<ContentDTO> {
    return api.get(`/contents/${contentId}`).then(res => res.data);
  },

  async getSections(contentId: string): Promise<ContentSectionDTO[]> {
    return api.get(`/contents/${contentId}/sections`).then(res => res.data);
  },

  async getUserProgress(userId: string): Promise<UserContentProgressDTO[]> {
    return api.get(`/contents/${userId}/progress`).then(res => res.data);
  },

  async completeContent(contentId: string): Promise<CompleteContentResponseDTO> {
    return api.post(`/contents/${contentId}/complete`).then(res => res.data);
  }
};