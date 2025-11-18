import { useCallback, useEffect, useMemo, useState } from "react";
import { categoryService } from "../services/categoryService";
import type { CategoryDTO } from "../dtos/categoryDto";
import { useLoading } from "@/app/hooks/useLoading";

export function useCategories() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const { showLoading, hideLoading } = useLoading();

  const loadCategories = useCallback(async () => {
    try {
      showLoading();
      setError(null);

      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err: any) {
      setError(err.message ?? "Erro ao carregar categorias");
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const rootCategories = useMemo(
    () => categories.filter((c) => !c.parentCategoryId),
    [categories]
  );

  const subcategories = useMemo(
    () => categories.filter((c) => c.parentCategoryId === selectedCategory),
    [categories, selectedCategory]
  );

  return {
    categories: rootCategories,
    subcategories,
    selectedCategory,
    selectedSubcategory,
    error,
    setSelectedCategory,
    setSelectedSubcategory,
  };
};
