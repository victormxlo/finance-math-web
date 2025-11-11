export interface GamificationProfileDTO {
  userId: string;
  username: string;
  levelId: number;
  levelName: string;
  experiencePoints: number;
  virtualCurrency: number;
  currentStreakDays: number;
  lastActivityDate: string;
  achievementsIds: string[];
  challengeProgressesIds: string[];
};
