import { useCallback, useEffect, useState } from "react";
import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import { achievementService } from "@/features/achievement/services/achievementService";

export function useAchievements() {
  const [data, setData] = useState<AchievementDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await achievementService.getAll();
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load achievements");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};
