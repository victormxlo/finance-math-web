import { useCallback, useEffect, useState } from "react";
import type { ActivityEvent } from "../types/activityEvent";
import { exerciseService } from "@/features/exercise/services/exerciseService";
import { contentService } from "@/features/content/services/contentService";
import { achievementService } from "@/features/achievement/services/achievementService";
import { challengeService } from "@/features/challenge/services/challengeService";
import { useLoading } from "@/app/hooks/useLoading";

export function useActivityTimeline(userId: string, limit: number = 4) {
  const { showLoading, hideLoading } = useLoading();
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<ActivityEvent[]>([]);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      showLoading();

      const [
        contentProgress,
        exerciseProgress,
        achievements,
        challengeProgress
      ] = await Promise.all([
        contentService.getUserProgress(userId),
        exerciseService.getProgress(userId),
        achievementService.getProgress(userId),
        challengeService.getProgress(userId)
      ]);

      const mappedContents: ActivityEvent[] = contentProgress
        .filter((c) => c.completedAt)
        .map((c) => ({
          id: c.contentId,
          type: "content",
          title: c.contentTitle,
          completedAt: c.completedAt
        }));

      const mappedExercises: ActivityEvent[] = exerciseProgress
        .filter((e) => e.completedAt)
        .map((e) => ({
          id: e.exerciseId,
          type: "exercise",
          title: e.exerciseQuestion,
          completedAt: e.completedAt
        }));

      const mappedAchievements: ActivityEvent[] = achievements
        .filter((a) => a.unlockedAt)
        .map((a) => ({
          id: a.achievementId,
          type: "achievement",
          title: a.achievementName,
          unlockedAt: a.unlockedAt
        }));

      const mappedChallenges: ActivityEvent[] = challengeProgress.map((c) => ({
        id: c.challengeId,
        type: "challenge",
        title: c.challengeName,
        startedAt: c.startedAt,
        completedAt: c.completedAt ?? undefined,
        progress: {
          current: c.currentProgress,
          target: c.targetProgress,
          isCompleted: c.isCompleted
        }
      }));

      const aggregated = [
        ...mappedContents,
        ...mappedExercises,
        ...mappedAchievements,
        ...mappedChallenges
      ];

      const sorted = aggregated.sort((a, b) => {
        const aDate = new Date(
          a.completedAt ?? a.unlockedAt ?? a.startedAt ?? 0
        ).getTime();
        const bDate = new Date(
          b.completedAt ?? b.unlockedAt ?? b.startedAt ?? 0
        ).getTime();
        return bDate - aDate;
      });

      setEvents(sorted.slice(0, limit));
    } catch (error) {
      console.error("Failed to load activity timeline:", error);
      setEvents([]);
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [userId, limit, showLoading, hideLoading]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading
  };
};
