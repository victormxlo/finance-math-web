import type { ExerciseOptionPublicDTO } from "./exercisePublicOptionDto";

export interface ExerciseDTO {
  id: string;
  question: string;
  difficulty: string;
  options: ExerciseOptionPublicDTO[];
  contentIds: string[];
};
