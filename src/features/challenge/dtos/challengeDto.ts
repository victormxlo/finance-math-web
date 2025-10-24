export interface ChallengeDTO {
  id: string;
  name: string;
  description: string;
  criteriaKey: string;
  currentProgress: number;
  targetProgress: number;
  isCompleted: boolean;
  startedAt: string;
  completedAt?: string | null;
};
