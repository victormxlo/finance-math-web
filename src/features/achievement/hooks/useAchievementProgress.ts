import { useCallback, useEffect, useState } from "react";
import type { UserAchievementDTO } from "@/features/achievement/dtos/userAchievementDto";
import { achievementService } from "@/features/achievement/services/achievementService";

export function useAchievementProgress(userId: string) {
  const [data, setData] = useState<UserAchievementDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await achievementService.getUserProgress(userId);
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load user achievement progress");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};
