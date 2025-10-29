import { useState, useCallback, useEffect } from "react";
import { contentService } from "../services/contentService";
import type { ContentSectionDTO } from "../dtos/contentSectionDto";

export function useContentSections(contentId?: string, initialLoad = true) {
  const [data, setData] = useState<ContentSectionDTO[] | null>(null);
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
        const sections = await contentService.getSections(contentId);
        if (signal?.aborted) return;
        setData(sections);
      } catch (err: any) {
        if (signal?.aborted) return;
        setError(err?.message ?? "Failed to load sections");
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [contentId]
  );

  useEffect(() => {
    if (!initialLoad) return;
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, initialLoad]);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload };
}