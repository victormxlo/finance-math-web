export interface CompleteExerciseResponseDTO {
  exerciseId: string;
  isCorrect: boolean;
  usedHint: boolean;
  explanation?: string;
  alreadyCompleted: boolean;
  reward?: Record<string, any>;
  profile?: Record<string, any>;
  completedAtUtc?: string;
  achievementsUnlocked?: Array<Record<string, any>>;
  challengesProgress?: Array<Record<string, any>>;
  nextRecommended?: Array<Record<string, any>>;
};
