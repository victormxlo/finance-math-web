import { useState, useCallback } from "react";
import type { ValidateExerciseAnswerDTO } from "../dtos/validateExerciseAnswerDto";
import { exerciseService } from "../services/exerciseService";
import { useLoading } from "@/app/hooks/useLoading";

export function useValidateExerciseAnswer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const validate = useCallback(async (exerciseId: string, optionId: string): Promise<ValidateExerciseAnswerDTO> => {
    setLoading(true);
    showLoading();
    setError(null);

    try {
      const res = await exerciseService.validateAnswer(exerciseId, optionId);
      return res;
    } catch (err: any) {
      setError(err?.message ?? "Falha em validação de resposta");
      throw err;
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  return { validate, loading, error };
};
