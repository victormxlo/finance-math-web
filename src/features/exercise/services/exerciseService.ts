import type { CompleteExerciseResponseDTO } from "../dtos/completeExerciseResponseDto";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import type { ExerciseHintDTO } from "../dtos/exerciseHintDto";
import type { UserExerciseProgressDTO } from "../dtos/userExerciseProgressDto";
import type { ValidateExerciseAnswerDTO } from "../dtos/validateExerciseAnswerDto";
import { mockExercises, mockHints, mockValidateResponses, mockCompleteResponse, mockProgress } from "../mocks/mockExercises";

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const exerciseService = {
  async getAll(): Promise<ExerciseDTO[]> {
    await wait();
    return [...mockExercises];
  },

  async getById(id: string): Promise<ExerciseDTO> {
    await wait();
    const found = mockExercises.find((e) => e.id === id);
    if (!found) throw new Error("Exercise not found (mock)");
    return { ...found };
  },

  async getHints(exerciseId: string): Promise<ExerciseHintDTO[]> {
    await wait();
    return mockHints.filter((h) => h.exerciseId === exerciseId).sort((a, b) => a.order - b.order);
  },

  async validateAnswer(exerciseId: string, optionId: string): Promise<ValidateExerciseAnswerDTO> {
    await wait(250);
    const key = `${exerciseId}:${optionId}`;
    return mockValidateResponses[key] ?? { exerciseId, exerciseOptionId: optionId, isCorrect: false };
  },

  async completeExercise(exerciseId: string, optionId: string, usedHint = false, userId?: string): Promise<CompleteExerciseResponseDTO> {
    await wait(300);
    const res = { ...mockCompleteResponse, usedHint, exerciseId };
    return res;
  },

  async getProgress(userId: string): Promise<UserExerciseProgressDTO[]> {
    await wait();
    return [...mockProgress];
  },

  async getExplanation(exerciseId: string): Promise<string> {
    await wait(150);
    return "Explanation for this exercise (mock).";
  },
};