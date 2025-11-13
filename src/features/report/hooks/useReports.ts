import { useState } from "react";
import type { ReportType } from "../types/ReportType";
import { ReportsService } from "../services/reportService";

export function useReports() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function downloadReport(type: ReportType) {
    setIsLoading(true);
    setError(null);

    try {
      await ReportsService.downloadReport(type);
    } catch (err: any) {
      console.error("Erro ao baixar relatório:", err);
      setError(err.message || "Erro ao gerar o relatório. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    downloadReport,
  };
};
