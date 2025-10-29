export interface CompleteContentResponseDTO {
  contentId: string;
  moduleCompleted: boolean;
  reward?: Record<string, any>;
  profile?: Record<string, any>;
  achievementsUnlocked?: Array<Record<string, any>>;
  completedAtUtc?: string;
  challengesProgress?: Array<Record<string, any>>;
  nextRecommended?: Array<Record<string, any>>;
};
