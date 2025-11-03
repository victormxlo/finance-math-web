import { useCallback, useEffect, useState } from "react";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import { exerciseService } from "../services/exerciseService";

export function useExercises() {
  const [data, setData] = useState<ExerciseDTO[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const exercises = await exerciseService.getAll();
      setData(exercises);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load exercises.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};
