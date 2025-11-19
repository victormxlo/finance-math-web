export interface UserExerciseProgressDTO {
  profileId: string;
  userId: string;
  exerciseId: string;
  exerciseQuestion: string;
  categoryId?: string | null;
  completedAt: string;
};
