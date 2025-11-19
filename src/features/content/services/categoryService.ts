import { mapApiError } from "@/lib/api/apiErrorMapper";
import { categoryApi } from "../api/categoryApi";

export const categoryService = {
  async getAll() {
    try {
      const categories = await categoryApi.getCategories();
      return categories;
    } catch (err: any) {
      throw mapApiError(err);
    }
  },

  async getById(id: string) {
    try {
      const category = await categoryApi.getCategoryById(id);
      return category;
    } catch (err: any) {
      throw mapApiError(err);
    }
  },
};
