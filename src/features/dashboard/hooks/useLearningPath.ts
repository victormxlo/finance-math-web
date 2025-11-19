import { useLoading } from "@/app/hooks/useLoading";
import { categoryService } from "@/features/content/services/categoryService";
import { contentService } from "@/features/content/services/contentService";
import { useCallback, useEffect, useState } from "react";

export interface LearningPathItemData {
  id: string;
  title: string;
  completed: number;
  total: number;
}

export function useLearningPath(userId?: string) {
  const { showLoading, hideLoading } = useLoading();

  const [data, setData] = useState<LearningPathItemData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!userId) {
        setData([]);
        setError("Usuário não identificado");
        return;
      }

      showLoading();
      setError(null);

      try {
        const [categories, contents, progress] = await Promise.all([
          categoryService.getAll(),
          contentService.getAll(),
          contentService.getUserProgress(userId)
        ]);

        if (signal?.aborted) return;

        const completedMap = new Set(
          progress.map(p => p.contentId)
        );

        const categoryMap = new Map(
          categories.map(c => [c.id, c])
        );

        const buildCategoryStats = (categoryId: string) => {
          const category = categoryMap.get(categoryId);
          if (!category) return { total: 0, completed: 0 };

          let total = 0;
          let completed = 0;

          if (category.contentIds.length > 0) {
            const ownContents = contents.filter(c => c.categoryId === category.id);
            total += ownContents.length;
            completed += ownContents.filter(c => completedMap.has(c.id)).length;
          }

          if (category.subcategoryIds.length > 0) {
            for (const subId of category.subcategoryIds) {
              const subStats = buildCategoryStats(subId);
              total += subStats.total;
              completed += subStats.completed;
            }
          }

          return { total, completed };
        };

        const finalItems: LearningPathItemData[] = [];

        for (const category of categories) {
          const { total, completed } = buildCategoryStats(category.id);

          const hasAnyContent =
            total > 0 ||
            category.contentIds.length > 0 ||
            category.subcategoryIds.length > 0;

          if (!hasAnyContent) continue;

          finalItems.push({
            id: category.id,
            title: category.name,
            total,
            completed
          });
        }

        setData(finalItems);
      } catch (err: any) {
        if (!signal?.aborted) {
          setError(err?.message ?? "Falha ao carregar caminho de aprendizagem");
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

  return { data, error, reload };
};
