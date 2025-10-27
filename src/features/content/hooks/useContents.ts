import { useState } from "react";
import { mockCategories } from "../mocks/mockCategories";
import { mockContents } from "../mocks/mockContents";

export const useContents = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const categories = mockCategories.filter(c => !c.parentCategoryId);
  const subcategories = mockCategories.filter(c => c.parentCategoryId === selectedCategory);
  const contents = mockContents.filter(c => c.categoryId === selectedCategory || c.categoryId == selectedSubcategory);

  return {
    categories,
    subcategories,
    contents,
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory
  };
};
