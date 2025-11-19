import api from "@/lib/api/axiosInstance";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import type { ExerciseHintDTO } from "../dtos/exerciseHintDto";
import type { CompleteExerciseResponseDTO } from "../dtos/completeExerciseResponseDto";
import type { UserExerciseProgressDTO } from "../dtos/userExerciseProgressDto";
import type { ValidateExerciseAnswerDTO } from "../dtos/validateExerciseAnswerDto";

export const exerciseApi = {
  getAll(): Promise<ExerciseDTO[]> {
    return api.get("/exercises").then(res => res.data);
  },

  getById(id: string): Promise<ExerciseDTO> {
    return api.get(`/exercises/${id}`).then(res => res.data);
  },

  getHints(exerciseId: string): Promise<ExerciseHintDTO[]> {
    return api
      .get(`/exercises/${exerciseId}/hints`)
      .then(res => res.data);
  },

  validateAnswer(
    exerciseId: string,
    optionId: string
  ): Promise<ValidateExerciseAnswerDTO> {
    return api
      .post(`/exercises/${exerciseId}/validate`, { optionId })
      .then(res => res.data);
  },

  completeExercise(
    exerciseId: string,
    optionId: string,
    usedHint: boolean,
    userId?: string
  ): Promise<CompleteExerciseResponseDTO> {
    return api
      .post(`/exercises/${exerciseId}/complete`, {
        optionId,
        usedHint,
        userId,
      })
      .then(res => res.data);
  },

  getProgress(userId: string): Promise<UserExerciseProgressDTO[]> {
    return api
      .get(`/exercises/${userId}/progress`)
      .then(res => res.data);
  },

  getExplanation(exerciseId: string): Promise<string> {
    return api
      .get(`/exercises/${exerciseId}/explanation`)
      .then(res => res.data);
  },
};
