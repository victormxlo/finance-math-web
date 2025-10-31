export interface GamificationProfileSummaryDTO {
  userId: string;
  experiencePoints: number;
  virtualCurrency: number;
  levelId: number;
  levelName: string;
  currentStreakDays: number;
  lastActivityDate: string;
}