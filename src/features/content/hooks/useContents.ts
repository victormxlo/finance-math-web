import { mockContents } from "../mocks/mockContents";

export const useContents = (selectedCategory?: string | null, selectedSubcategory?: string | null) => {
  const contents = mockContents.filter(
    (content) =>
      content.categoryId === selectedCategory || content.categoryId === selectedSubcategory
  );

  return { contents };
};
