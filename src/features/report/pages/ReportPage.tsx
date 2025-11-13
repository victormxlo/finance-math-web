import { Navigate } from "react-router-dom";
import type { ReportType } from "../types/ReportType";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useReports } from "../hooks/useReports";
import { CardTitle } from "@/components/ui/CardTitle";
import { FileSpreadsheet } from "lucide-react";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardContent } from "@/components/ui/CardContent";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ReportPage() {
  const { user } = useAuth();
  const { isLoading, error, downloadReport } = useReports();

  if (user === undefined || user === null) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-muted-foreground">Carregando informações...</p>
      </div>
    );
  }

  if (user.type !== "Admin") {
    return <Navigate to="/" replace />;
  }

  const reports: { id: ReportType; title: string; description: string }[] = [
    {
      id: "user-engagement",
      title: "User Engagement Report",
      description:
        "Mede o engajamento dos usuários com conteúdos, exercícios e desafios.",
    },
    {
      id: "activity-overview",
      title: "Activity Overview Report",
      description:
        "Resumo das principais atividades dos usuários em toda a plataforma.",
    },
    {
      id: "challenges-summary",
      title: "Challenges Summary Report",
      description:
        "Apresenta o desempenho e conclusão dos desafios disponíveis.",
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-semibold">Relatórios</h1>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
          {error}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="shadow-md hover:shadow-lg transition-all border border-muted"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {report.title}
                <FileSpreadsheet className="text-primary" size={20} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {report.description}
              </p>
              <Button
                onClick={() => downloadReport(report.id)}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Gerando..." : "Download Report"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
