import type { ExerciseOptionPublicDTO } from "./exercisePublicOptionDto";

export interface ExerciseDTO {
  id: string;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  options: ExerciseOptionPublicDTO[];
  contentIds: string[];
};
