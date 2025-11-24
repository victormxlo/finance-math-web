import { useState, useCallback } from "react";
import type { ValidateExerciseAnswerDTO } from "../dtos/validateExerciseAnswerDto";
import { exerciseService } from "../services/exerciseService";
import { useLoading } from "@/app/hooks/useLoading";
import { useToast } from "@/app/hooks/useToast";

export function useValidateExerciseAnswer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const { toast } = useToast();

  const validate = useCallback(async (exerciseId: string, optionId: string, userId: string): Promise<ValidateExerciseAnswerDTO> => {
    setLoading(true);
    showLoading();
    setError(null);

    try {
      const res = await exerciseService.validateAnswer(exerciseId, optionId, userId);
      return res;
    } catch (err: any) {
      setError(err?.message ?? "Falha em validação de resposta");
      toast({ description: err?.message, variant: "destructive" });
      throw err;
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  return { validate, loading, error };
};
