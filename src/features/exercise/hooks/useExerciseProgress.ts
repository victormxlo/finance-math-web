import { useState, useCallback, useEffect } from "react";
import type { UserExerciseProgressDTO } from "../dtos/userExerciseProgressDto";
import { exerciseService } from "../services/exerciseService";
import { useLoading } from "@/app/hooks/useLoading";
import { useToast } from "@/app/hooks/useToast";

export function useExerciseProgress(userId?: string) {
  const [data, setData] = useState<UserExerciseProgressDTO[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const { toast } = useToast();

  const load = useCallback(async () => {
    if (!userId) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    showLoading();
    setError(null);

    try {
      const res = await exerciseService.getProgress(userId);
      setData(res);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar progresso de exercícios do usuário");
      toast({ description: err?.message, variant: "destructive" });
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [userId, showLoading, hideLoading]);

  useEffect(() => {
    if (!userId) return;
    void load();
  }, [load, userId]);

  return { data, loading, error, reload: load };
};
