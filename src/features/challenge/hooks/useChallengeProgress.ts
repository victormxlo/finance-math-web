import { useCallback, useEffect, useState } from "react";
import type { UserChallengeProgressDTO } from "../dtos/userChallengeProgressDto";
import { challengeService } from "../services/challengeService";

export function useChallengeProgress(userId?: string) {
  const [data, setData] = useState<UserChallengeProgressDTO[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) {
      setData(null);
      setError(null);
      return;
    };

    setLoading(true);
    setError(null);
    try {
      const response = await challengeService.getProgress(userId);
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load challenge progress");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    let mounted = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await challengeService.getProgress(userId);
        if (!mounted) return;
        setData(response);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message ?? "Failed to load challenge progress");
        setData(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userId]);

  return { data, loading, error, reload: load };
};
