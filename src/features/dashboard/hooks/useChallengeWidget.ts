import { useLoading } from "@/app/hooks/useLoading";
import type { UserChallengeProgressDTO } from "@/features/challenge/dtos/userChallengeProgressDto";
import { challengeService } from "@/features/challenge/services/challengeService";
import { useCallback, useEffect, useState } from "react";

export function useChallengeWidget(userId?: string, limit: number = 3) {
  const { showLoading, hideLoading } = useLoading();

  const [challenges, setChallenges] = useState<UserChallengeProgressDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      if (!userId) {
        setChallenges([]);
        setError("Usuário não identificado");
        return;
      }

      showLoading();
      setError(null);

      const data = await challengeService.getProgress(userId);

      const active = data.filter((p) => !p.isCompleted);

      setChallenges(active.slice(0, limit));
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar widget de desafios");
      setChallenges([]);
    } finally {
      hideLoading();
    }
  }, [limit, showLoading, hideLoading]);

  useEffect(() => {
    void load();
  }, [load]);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  return {
    challenges,
    error,
    reload
  };
};
