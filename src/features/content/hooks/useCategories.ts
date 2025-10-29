import { useState } from "react";
import { mockCategories } from "../mocks/mockCategories";

export const useCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const categories = mockCategories.filter(c => !c.parentCategoryId);

  const subcategories = mockCategories.filter(
    c => c.parentCategoryId === selectedCategory
  );

  return {
    categories,
    subcategories,
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory,
  };
};
