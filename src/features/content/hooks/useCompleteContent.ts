import { useState, useCallback } from "react";
import type { CompleteContentResponseDTO } from "../dtos/completeContentResponseDto";
import { contentService } from "../services/contentService";

export function useCompleteContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompleteContentResponseDTO | null>(null);

  const complete = useCallback(async (contentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await contentService.completeContent(contentId);
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err?.message ?? "Falha ao concluir conteúdo");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { complete, loading, error, result };
}