import { useState, useCallback } from "react";
import type { ValidateExerciseAnswerDTO } from "../dtos/validateExerciseAnswerDto";
import { exerciseService } from "../services/exerciseService";

export function useValidateExerciseAnswer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(async (exerciseId: string, optionId: string): Promise<ValidateExerciseAnswerDTO> => {
    setLoading(true);
    setError(null);

    try {
      const res = await exerciseService.validateAnswer(exerciseId, optionId);
      return res;
    } catch (err: any) {
      setError(err?.message ?? "Validation failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { validate, loading, error };
};
