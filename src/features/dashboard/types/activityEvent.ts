import { type ActivityEventType } from "@/features/dashboard/constants/activityEventTypes";

export type ActivityEvent = {
  type: ActivityEventType;
  id: string;
  title: string;
  criteriaKey?: string;
  categoryName?: string;
  startedAt?: string;
  completedAt?: string;
  unlockedAt?: string;
  progress?: {
    current: number;
    target: number;
    isCompleted: boolean;
  };
};
