import { useState, useCallback } from "react";
import type { CompleteExerciseResponseDTO } from "../dtos/completeExerciseResponseDto";
import { exerciseService } from "../services/exerciseService";

export function useCompleteExercise() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompleteExerciseResponseDTO | null>(null);

  const complete = useCallback(async (exerciseId: string, optionId: string, usedHint = false, userId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await exerciseService.completeExercise(exerciseId, optionId, usedHint, userId);
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err?.message ?? "Complete failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { complete, loading, error, result };
};
