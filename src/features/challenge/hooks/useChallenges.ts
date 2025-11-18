import { useCallback, useEffect, useState } from "react";
import type { ChallengeDTO } from "../dtos/challengeDto";
import { challengeService } from "../services/challengeService";
import { useLoading } from "@/app/hooks/useLoading";

export function useChallenges(active?: boolean | null) {
  const [data, setData] = useState<ChallengeDTO[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { showLoading, hideLoading } = useLoading();

  const load = useCallback(async () => {
    setLoading(true);
    showLoading();
    setError(null);

    try {
      const response = await challengeService.getAll(active);
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar desafios");
      setData(null);
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [active, showLoading, hideLoading]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      showLoading();
      setError(null);

      try {
        const response = await challengeService.getAll(active);
        if (!mounted) return;
        setData(response);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message ?? "Falha ao carregar desafios");
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
  }, [active, showLoading, hideLoading]);

  return { data, loading, error, reload: load };
};
