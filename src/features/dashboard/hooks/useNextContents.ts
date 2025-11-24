import { useLoading } from "@/app/hooks/useLoading";
import { useToast } from "@/app/hooks/useToast";
import type { ContentDTO } from "@/features/content/dtos/contentDto";
import { contentService } from "@/features/content/services/contentService";
import { useCallback, useEffect, useState } from "react";

export function useNextContents(userId?: string) {
  const { showLoading, hideLoading } = useLoading();

  const [contents, setContents] = useState<ContentDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();
  
  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!userId) {
        setError("Usuário não identificado");
        setContents([]);
        return;
      }

      showLoading();
      setError(null);

      try {
        const [allContents, progress] = await Promise.all([
          contentService.getAll(),
          contentService.getUserProgress(userId)
        ]);

        if (signal?.aborted) return;

        const completed = new Set(
          progress.map((p) => p.contentId)
        );

        const pending = allContents.filter((c) => !completed.has(c.id));

        pending.sort((a, b) => a.title.localeCompare(b.title));

        setContents(pending);
      } catch (err: any) {
        if (!signal?.aborted) {
          setError(err?.message ?? "Falha ao carregar próximos conteúdos");
          toast({ description: err?.message, variant: "destructive" });
        }
      } finally {
        if (!signal?.aborted) hideLoading();
      }
    },
    [userId, showLoading, hideLoading]
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  return { contents, error, reload };
};
