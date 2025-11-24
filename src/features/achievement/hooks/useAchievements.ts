import { useCallback, useEffect, useState } from "react";
import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import { achievementService } from "@/features/achievement/services/achievementService";
import { useLoading } from "@/app/hooks/useLoading";
import { useToast } from "@/app/hooks/useToast";

export function useAchievements() {
  const [data, setData] = useState<AchievementDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const { showLoading, hideLoading } = useLoading();

  const load = useCallback(async () => {
    setLoading(true);
    showLoading();
    setError(null);

    try {
      const response = await achievementService.getAll();
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar conquistas");
      toast({ description: err?.message, variant: "destructive" });
      setData([]);
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};
