import { useCallback, useEffect, useState } from "react";
import type { ExerciseHintDTO } from "../dtos/exerciseHintDto";
import { exerciseService } from "../services/exerciseService";
import { useLoading } from "@/app/hooks/useLoading";

export function useExerciseHints(exerciseId?: string) {
  const [hints, setHints] = useState<ExerciseHintDTO[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const load = useCallback(async () => {
    if (!exerciseId) {
      setHints(null);
      setError(null);
      setVisibleCount(0);
      return;
    }
    setLoading(true);
    showLoading();
    setError(null);
    try {
      const items = await exerciseService.getHints(exerciseId);
      setHints(items);
      setVisibleCount(0);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar dicas");
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [exerciseId, showLoading, hideLoading]);

  useEffect(() => {
    void load();
  }, [load]);

  const showNext = useCallback(() => {
    setVisibleCount((v) => Math.min((hints?.length ?? 0), v + 1));
  }, [hints]);

  const visibleHints = hints ? hints.slice(0, visibleCount) : [];

  return { hints, visibleHints, visibleCount, showNext, loading, error, reload: load };
};