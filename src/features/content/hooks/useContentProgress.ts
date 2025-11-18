import { useState, useCallback, useEffect, useMemo } from "react";
import { contentService } from "../services/contentService";
import type { UserContentProgressDTO } from "../dtos/userContentProgressDto";

export function useContentProgress(userId?: string, contentId?: string) {
  const [data, setData] = useState<UserContentProgressDTO[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!userId) {
        setData(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const all = await contentService.getUserProgress(userId);
        if (signal?.aborted) return;
        setData(all);
      } catch (err: any) {
        if (signal?.aborted) return;
        setError(err?.message ?? "Falha ao carregar progresso de conteúdos do usuário");
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, userId]);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!data) return [];
    return contentId ? data.filter((d) => d.contentId === contentId) : data;
  }, [data, contentId]);

  return { data: filtered, raw: data, loading, error, reload };
}