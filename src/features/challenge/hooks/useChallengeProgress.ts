import { useCallback, useEffect, useState } from "react";
import type { UserChallengeProgressDTO } from "../dtos/userChallengeProgressDto";
import { challengeService } from "../services/challengeService";
import { useLoading } from "@/app/hooks/useLoading";

export function useChallengeProgress(userId?: string) {
  const [data, setData] = useState<UserChallengeProgressDTO[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { showLoading, hideLoading } = useLoading();

  const load = useCallback(async () => {
    if (!userId) {
      setData(null);
      setError(null);
      return;
    };

    setLoading(true);
    showLoading();
    setError(null);
    try {
      const response = await challengeService.getProgress(userId);
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar progresso de desafios do usuário");
      setData(null);
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [userId, showLoading, hideLoading]);

  useEffect(() => {
    if (!userId) return;
    let mounted = true;

    (async () => {
      setLoading(true);
      showLoading();
      setError(null);
      try {
        const response = await challengeService.getProgress(userId);
        if (!mounted) return;
        setData(response);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message ?? "Falha ao carregar progresso de desafios do usuário");
        setData(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
        hideLoading();
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userId, showLoading, hideLoading]);

  return { data, loading, error, reload: load };
};
