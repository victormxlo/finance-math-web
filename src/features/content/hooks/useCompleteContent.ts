import { useState, useCallback } from "react";
import type { CompleteContentResponseDTO } from "../dtos/completeContentResponseDto";
import { contentService } from "../services/contentService";
import { useToast } from "@/app/hooks/useToast";
import { useLoading } from "@/app/hooks/useLoading";

export function useCompleteContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompleteContentResponseDTO | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const { toast } = useToast();

  const complete = useCallback(async (contentId: string, userId: string) => {
    setLoading(true);
    showLoading();
    setError(null);
    try {
      const res = await contentService.completeContent(contentId, userId);
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err?.message ?? "Falha ao concluir conteúdo");
      toast({ description: err?.message, variant: "destructive" });
      throw err;
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  return { complete, loading, error, result };
}