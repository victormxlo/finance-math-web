import { useState, useCallback, useEffect } from "react";
import { contentService } from "../services/contentService";
import type { ContentDTO } from "../dtos/contentDto";

export function useContent(contentId?: string) {
  const [data, setData] = useState<ContentDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!contentId) {
        setData(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await contentService.getById(contentId);
        if (signal?.aborted) return;
        setData(result);
      } catch (err: any) {
        if (signal?.aborted) return;
        setError(err?.message ?? "Failed to load content");
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [contentId]
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload };
}