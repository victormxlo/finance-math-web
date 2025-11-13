import { triggerFileDownload } from "@/features/report/utils/triggerFileDownload";
import { getReportApi } from "../api/reportApi";
import { mapApiError } from "@/lib/api/apiErrorMapper";
import type { ReportType } from "../types/ReportType";

export const ReportsService = {
  async downloadReport(type: ReportType) {
    try {
      const blob = await getReportApi(type);
      triggerFileDownload(blob, `${type}.xlsx`);
    } catch (error: any) {
      throw mapApiError(error);
    }
  },
};
