import { useEffect, useMemo, useState } from "react";
import type { ActivityEvent } from "../types/activityEvent";
import { mapAchievementProgress, mapChallengeProgress, mapContentProgress, mapExerciseProgress } from "../utils/mapActivityEvents";
import { mockContentProgress } from "../mocks/progress/mockContentProgress";
import { mockExerciseProgress } from "../mocks/progress/mockExerciseProgress";
import { mockAchievementProgress } from "../mocks/progress/mockAchievementProgress";
import { mockChallengeProgress } from "../mocks/progress/mockChallengeProgress";

export function useActivityTimeline(userId: string, { delay = 350 } = {}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    async function fetchMocks() {
      await new Promise((res) => setTimeout(res, delay));

      const contents = mapContentProgress(mockContentProgress as any[]);
      const exercises = mapExerciseProgress(mockExerciseProgress as any[]);
      const achievements = mapAchievementProgress(mockAchievementProgress as any[]);
      const challenges = mapChallengeProgress(mockChallengeProgress as any[]);

      const aggregated = [...contents, ...exercises, ...achievements, ...challenges];

      const sorted = aggregated.sort((a, b) => {
        const aDate = new Date(a.completedAt ?? a.unlockedAt ?? a.startedAt ?? 0).getTime();
        const bDate = new Date(b.completedAt ?? b.unlockedAt ?? b.startedAt ?? 0).getTime();

        return bDate - aDate;
      });

      if (!mounted) return;

      setEvents(sorted);
      setLoading(false);
    };

    fetchMocks().catch((err) => {
      console.error("useActivityTimelineMock failed", err);

      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [userId, delay]);

  const count = useMemo(() => events.length, [events]);

  return { events, loading, count };
};
