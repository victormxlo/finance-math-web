export const FEEDBACK_TYPES = {
  CONTENT: "content",
  EXERCISE: "exercise"
} as const;

export type FeedbackTypes = typeof FEEDBACK_TYPES[keyof typeof FEEDBACK_TYPES];