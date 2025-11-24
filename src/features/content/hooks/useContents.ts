import { useCallback, useEffect, useState } from "react";
import { contentService } from "@/features/content/services/contentService";
import type { ContentDTO } from "@/features/content/dtos/contentDto";
import { useLoading } from "@/app/hooks/useLoading";
import { useToast } from "@/app/hooks/useToast";

export function useContents(
  selectedCategory?: string | null,
  selectedSubcategory?: string | null
) {
  const [contents, setContents] = useState<ContentDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const { toast } = useToast();
  
  const load = useCallback(async () => {
    setLoading(true);
    showLoading();
    setError(null);

    try {
      const all = await contentService.getAll();

      const filtered = all.filter(
        c =>
          c.categoryId === selectedCategory ||
          c.categoryId === selectedSubcategory
      );

      setContents(filtered);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar conteudos");
      toast({ description: err?.message, variant: "destructive" });
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [selectedCategory, selectedSubcategory, showLoading, hideLoading]);

  useEffect(() => {
    void load();
  }, [load]);

  return { contents, loading, error, reload: load };
};
