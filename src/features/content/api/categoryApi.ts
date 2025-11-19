import api from "@/lib/api/axiosInstance";
import type { CategoryDTO } from "../dtos/categoryDto";

export const categoryApi = {
  getCategories(): Promise<CategoryDTO[]> {
    return api.get("/Categories").then(res => res.data);
  },

  async getCategoryById(id: string): Promise<CategoryDTO> {
    return api.get(`/Categories/${id}`).then(res => res.data);
  },
};
