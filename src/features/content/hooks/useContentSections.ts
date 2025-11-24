import { useState, useCallback, useEffect } from "react";
import { contentService } from "../services/contentService";
import type { ContentSectionDTO } from "../dtos/contentSectionDto";
import { useLoading } from "@/app/hooks/useLoading";
import { useToast } from "@/app/hooks/useToast";

export function useContentSections(contentId?: string, initialLoad = true) {
  const [data, setData] = useState<ContentSectionDTO[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const { showLoading, hideLoading } = useLoading();

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!contentId) {
        setData(null);
        setError(null);
        return;
      }

      setLoading(true);
      showLoading();
      setError(null);

      try {
        const sections = await contentService.getSections(contentId);
        if (signal?.aborted) return;
        setData(sections);
      } catch (err: any) {
        if (signal?.aborted) return;
        setError(err?.message ?? "Falha ao carregar seções");
        toast({ description: err?.message, variant: "destructive" });
      } finally {
        if (!signal?.aborted) {
          setLoading(false); 
          hideLoading();
        }
      }
    },
    [contentId, showLoading, hideLoading]
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