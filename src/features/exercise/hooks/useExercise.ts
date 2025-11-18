import { useCallback, useEffect, useState } from "react";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import { exerciseService } from "../services/exerciseService";
import { useLoading } from "@/app/hooks/useLoading";

export function useExercise(exerciseId?: string) {
  const [data, setData] = useState<ExerciseDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const load = useCallback(async () => {
    if (!exerciseId) {
      setData(null);
      setError(null);
      return;
    }
    setLoading(true);
    showLoading();
    setError(null);

    try {
      const ex = await exerciseService.getById(exerciseId);
      setData(ex);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar exercício");
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [exerciseId, showLoading, hideLoading]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};