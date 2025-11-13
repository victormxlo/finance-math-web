import api from "@/lib/api/axiosInstance";
import type { ReportType } from "../types/ReportType";

export async function getReportApi(route: ReportType): Promise<Blob> {
  const response = await api.get(`/Reports/${route}`, {
    responseType: "blob",
  });

  return response.data;
};
