import { useState, useCallback } from "react";
import type { CompleteExerciseResponseDTO } from "../dtos/completeExerciseResponseDto";
import { exerciseService } from "../services/exerciseService";
import { useLoading } from "@/app/hooks/useLoading";

export function useCompleteExercise() {
  const [result, setResult] = useState<CompleteExerciseResponseDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const complete = useCallback(async (exerciseId: string, optionId: string, usedHint = false, userId?: string) => {
    setLoading(true);
    showLoading();
    setError(null);
    try {
      const res = await exerciseService.completeExercise(exerciseId, optionId, usedHint, userId);
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err?.message ?? "Falha na conclusão de exercício");
      throw err;
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  return { complete, loading, error, result };
};
