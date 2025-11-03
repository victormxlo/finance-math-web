import { useCallback, useEffect, useState } from "react";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import { exerciseService } from "../services/exerciseService";

export function useExercise(exerciseId?: string) {
  const [data, setData] = useState<ExerciseDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!exerciseId) {
      setData(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const ex = await exerciseService.getById(exerciseId);
      setData(ex);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load exercise");
    } finally {
      setLoading(false);
    }
  }, [exerciseId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};