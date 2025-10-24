import { ACTIVITY_EVENT_TYPES } from "../constants/activityEventTypes";
import type { ActivityEvent } from "../types/activityEvent";

export function mapContentProgress(data: any[]): ActivityEvent[] {
  return data.map((item) => ({
    type: ACTIVITY_EVENT_TYPES.CONTENT,
    id: item.contentId,
    title: item.contentTitle,
    categoryName: item.categoryName,
    completedAt: item.completedAt,
  }))
};

export function mapExerciseProgress(data: any[]): ActivityEvent[] {
  return data.map((item) => ({
    type: ACTIVITY_EVENT_TYPES.EXERCISE,
    id: item.exerciseId,
    title: item.exerciseQuestion,
    completedAt: item.completedAt
  }));
};

export function mapAchievementProgress(data: any[]): ActivityEvent[] {
  return data.map((item) => ({
    type: ACTIVITY_EVENT_TYPES.ACHIEVEMENT,
    id: item.achievementId,
    title: item.achievementName,
    criteriaKey: item.criteriaKey,
    unlockedAt: item.unlockedAt,
  }));
};

export function mapChallengeProgress(data: any[]): ActivityEvent[] {
  return data.map((item) => ({
    type: ACTIVITY_EVENT_TYPES.CHALLENGE,
    id: item.challengeId,
    title: item.challengeName,
    criteriaKey: item.criteriaKey,
    progress: {
      current: item.currentProgress,
      target: item.targetProgress,
      isCompleted: item.isCompleted,
    },
    startedAt: item.startedAt,
    completedAt: item.completedAt,
  }));
};
