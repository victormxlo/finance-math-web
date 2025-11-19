import { useLoading } from "@/app/hooks/useLoading";
import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import { achievementService } from "@/features/achievement/services/achievementService";
import { useCallback, useEffect, useState } from "react";

export function useAchievementsHighlight(userId?: string) {
  const { showLoading, hideLoading } = useLoading();

  const [achievements, setAchievements] = useState<AchievementDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!userId) {
        setError("Usuário não identificado");
        setAchievements([]);
        return;
      }

      showLoading();
      setError(null);

      try {
        const [allAchievements, userAchievements] = await Promise.all([
          achievementService.getAll(),
          achievementService.getProgress(userId)
        ]);

        if (signal?.aborted) return;

        const completed = new Set(userAchievements.map(a => a.achievementId));

        const pending = allAchievements.filter(a => !completed.has(a.id));

        pending.sort((a, b) => a.name.localeCompare(b.name));

        setAchievements(pending);
      } catch (err: any) {
        if (!signal?.aborted) {
          setError(err?.message ?? "Falha ao carregar conquistas");
        }
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

  return { achievements, error, reload };
};
