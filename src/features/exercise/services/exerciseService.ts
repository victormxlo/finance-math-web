import { exerciseApi } from "../api/exerciseApi";
import type { CompleteExerciseResponseDTO } from "../dtos/completeExerciseResponseDto";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import type { ExerciseHintDTO } from "../dtos/exerciseHintDto";
import type { UserExerciseProgressDTO } from "../dtos/userExerciseProgressDto";
import type { ValidateExerciseAnswerDTO } from "../dtos/validateExerciseAnswerDto";

export const exerciseService = {
  getAll(): Promise<ExerciseDTO[]> {
    return exerciseApi.getAll();
  },

  getById(id: string): Promise<ExerciseDTO> {
    return exerciseApi.getById(id);
  },

  getHints(exerciseId: string): Promise<ExerciseHintDTO[]> {
    return exerciseApi.getHints(exerciseId);
  },

  validateAnswer(
    exerciseId: string,
    optionId: string
  ): Promise<ValidateExerciseAnswerDTO> {
    return exerciseApi.validateAnswer(exerciseId, optionId);
  },

  completeExercise(
    exerciseId: string,
    optionId: string,
    usedHint = false,
    userId?: string
  ): Promise<CompleteExerciseResponseDTO> {
    return exerciseApi.completeExercise(exerciseId, optionId, usedHint, userId);
  },

  getProgress(userId: string): Promise<UserExerciseProgressDTO[]> {
    return exerciseApi.getProgress(userId);
  },

  getExplanation(exerciseId: string): Promise<string> {
    return exerciseApi.getExplanation(exerciseId);
  },
};
