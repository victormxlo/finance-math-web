import { useCallback, useEffect, useState } from "react";
import type { ChallengeDTO } from "../dtos/challengeDto";
import { challengeService } from "../services/challengeService";

export function useChallenges(active?: boolean | null) {
  const [data, setData] = useState<ChallengeDTO[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(false);
    setError(null);

    try {
      const response = await challengeService.getAll(active);
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load challenges");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [active]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(false);
      setError(null);

      try {
        const response = await challengeService.getAll(active);
        if (!mounted) return;
        setData(response);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message ?? "Failed to load challenges");
      setData(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [active]);

  return { data, loading, error, reload: load };
};
