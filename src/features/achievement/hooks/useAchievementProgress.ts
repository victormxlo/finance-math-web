import { useCallback, useEffect, useState } from "react";
import type { UserAchievementDTO } from "@/features/achievement/dtos/userAchievementDto";
import { achievementService } from "@/features/achievement/services/achievementService";
import { useLoading } from "@/app/hooks/useLoading";

export function useAchievementProgress(userId: string) {
  const [data, setData] = useState<UserAchievementDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { showLoading, hideLoading } = useLoading();

  const load = useCallback(async () => {
    setLoading(true);
    showLoading();
    setError(null);

    try {
      const response = await achievementService.getProgress(userId);
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar progresso de conquistas do usuário");
      setData([]);
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [userId, showLoading, hideLoading]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};
