export interface UserChallengeProgressDTO {
  profileId: string;
  userId: string;
  challengeId: string;
  challengeName: string;
  challengeDescription: string;
  criteriaKey: string;
  currentProgress: number;
  targetProgress: number;
  isCompleted: boolean;
  startedAt: string;
  completedAt?: string | null;
}