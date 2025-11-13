export const REPORT_TYPES = {
  USER_ENGAGEMENT: "user-engagement",
  ACTIVITY_OVERVIEW: "activity-overview",
  CHALLENGES_SUMMARY: "challenges-summary"
} as const;

export type ReportTypes = typeof REPORT_TYPES[keyof typeof REPORT_TYPES];
