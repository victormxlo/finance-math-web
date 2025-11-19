import { useLoading } from "@/app/hooks/useLoading";
import { achievementService } from "@/features/achievement/services/achievementService";
import { challengeService } from "@/features/challenge/services/challengeService";
import { contentService } from "@/features/content/services/contentService";
import { exerciseService } from "@/features/exercise/services/exerciseService";
import { gamificationService } from "@/features/gamification/services/gamificationService";
import { useCallback, useEffect, useState } from "react";

export interface QuickStatsData {
  completedContents: number;
  resolvedExercises: number;
  completedChallenges: number;
  achievements: number;
  currentStreak: string;
}

export function useQuickStats(userId: string | undefined) {
  const { showLoading, hideLoading } = useLoading();

  const [data, setData] = useState<QuickStatsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!userId) {
        setData(null);
        setError("Usuário não identificado");
        return;
      }

      showLoading();
      setError(null);

      try {
        const [
          contentProgress,
          exerciseProgress,
          challengeProgress,
          userAchievements,
          profile
        ] = await Promise.all([
          contentService.getUserProgress(userId),
          exerciseService.getProgress(userId),
          challengeService.getProgress(userId),
          achievementService.getProgress(userId),
          gamificationService.getProfile(userId)
        ]);

        if (signal?.aborted) return;

          const aggregated: QuickStatsData = {
            completedContents: contentProgress.filter(p => p.completedAt !== "").length,
            resolvedExercises: exerciseProgress.filter(p => p.completedAt !== "").length,
            completedChallenges: challengeProgress.filter(p => p.completedAt !== "").length,
            achievements: userAchievements.length,
            currentStreak: profile?.currentStreakDays
              ? `${profile?.currentStreakDays} dias`
              : "0 dias"
          };

        setData(aggregated);
      } catch (err: any) {
        if (signal?.aborted) return;
        setError(err?.message ?? "Falha ao carregar estatísticas");
      } finally {
        if (!signal?.aborted) hideLoading();
      }
    },
    [userId, showLoading, hideLoading]
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  return { data, error, reload };
}