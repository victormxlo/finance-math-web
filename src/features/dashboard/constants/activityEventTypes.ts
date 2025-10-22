export const ACTIVITY_EVENT_TYPES = {
  CONTENT: "content",
  EXERCISE: "exercise",
  ACHIEVEMENT: "achievement",
  CHALLENGE: "challenge"
} as const;

export type ActivityEventType = typeof ACTIVITY_EVENT_TYPES[keyof typeof ACTIVITY_EVENT_TYPES];
