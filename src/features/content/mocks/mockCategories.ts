import type { CategoryDTO } from "../dtos/categoryDto";

export const mockCategories: CategoryDTO[] = [
  {
    id: "1",
    name: "Juros",
    parentCategoryId: null,
    subcategoryIds: ["1-1", "1-2"],
    contentIds: []
  },
  {
    id: "1-1",
    name: "Juros Simples",
    parentCategoryId: "1",
    subcategoryIds: [],
    contentIds: ["c1", "c2"]
  },
  {
    id: "1-2",
    name: "Juros Compostos",
    parentCategoryId: "1",
    subcategoryIds: [],
    contentIds: ["c3"]
  },
  {
    id: "2",
    name: "Amortização",
    parentCategoryId: null,
    subcategoryIds: [],
    contentIds: ["c4"]
  },
];