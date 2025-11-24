import { useCallback, useEffect, useState } from "react";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import { exerciseService } from "../services/exerciseService";
import { useLoading } from "@/app/hooks/useLoading";
import { useToast } from "@/app/hooks/useToast";

export function useExercises() {
  const [data, setData] = useState<ExerciseDTO[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    showLoading();
    setError(null);

    try {
      const exercises = await exerciseService.getAll();
      setData(exercises);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar exercícios");
      toast({ description: err?.message ?? "Falha ao carregar exercícios", variant: "destructive" });
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};
