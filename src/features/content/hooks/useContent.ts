import { useState, useCallback, useEffect } from "react";
import { contentService } from "@/features/content/services/contentService";
import type { ContentDTO } from "@/features/content/dtos/contentDto";
import { useLoading } from "@/app/hooks/useLoading";

export function useContent(contentId?: string) {
  const { showLoading, hideLoading } = useLoading();
  const [data, setData] = useState<ContentDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!contentId) {
        setData(null);
        return;
      }

      showLoading();
      setError(null);

      try {
        const result = await contentService.getById(contentId);
        if (signal?.aborted) return;

        setData(result);
      } catch (err: any) {
        if (signal?.aborted) return;
        setError(err?.message ?? "Falha ao carregar conteúdo");
      } finally {
        hideLoading();
      }
    },
    [contentId, showLoading, hideLoading]
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return { data, error, reload: () => load() };
};
