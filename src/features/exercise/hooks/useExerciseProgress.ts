import { useState, useCallback, useEffect } from "react";
import type { UserExerciseProgressDTO } from "../dtos/userExerciseProgressDto";
import { exerciseService } from "../services/exerciseService";

export function useExerciseProgress(userId?: string) {
  const [data, setData] = useState<UserExerciseProgressDTO[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await exerciseService.getProgress(userId);
      setData(res);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load exercise progress");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    void load();
  }, [load, userId]);

  return { data, loading, error, reload: load };
};
