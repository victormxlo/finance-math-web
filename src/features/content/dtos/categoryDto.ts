export interface CategoryDTO {
  id: string;
  name: string;
  parentCategoryId?: string | null;
  subcategoryIds: string[];
  contentIds: string[];
};
