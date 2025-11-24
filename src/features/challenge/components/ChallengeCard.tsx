import type { FC } from "react";
import type { ChallengeDTO } from "../dtos/challengeDto";
import type { UserChallengeProgressDTO } from "../dtos/userChallengeProgressDto";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardTitle } from "@/components/ui/CardTitle";
import { CardContent } from "@/components/ui/CardContent";
import Progress from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";

interface ChallengeCardProps {
  challenge: ChallengeDTO;
  progress?: UserChallengeProgressDTO | null;
  onAction?: (type: "content" | "exercise") => void;
};

export const ChallengeCard: FC<ChallengeCardProps> = ({ challenge, progress, onAction }) => {
  const started = Boolean(progress && progress.startedAt);
  const completed = Boolean(progress && progress.isCompleted);
  const current = progress?.currentProgress ?? 0;
  const target = progress?.targetProgress ?? challenge.target ?? 1;
  const pct = Math.max(0, Math.min(100, Math.round((current / Math.max(1, target)) * 100)));

  const challengeType = challenge.criteriaKey.includes("content") 
    ? "content" : "exercise";

  const statusLabel = completed 
    ? "Concluído" 
    : started
      ? "Em andamento" 
      : "Não iniciado";

  const periodText = (() => {
    try {
      const start = new Date(challenge.startDate);
      const end = new Date(challenge.endDate);
      return `${start.toLocaleDateString()} — ${end.toLocaleDateString()}`;
    } catch {
      return "";
    }
  })();

  return (
    <Card className={cn("rounded-2xl p-4 flex flex-col h-full", completed ? "ring-1 ring-green-200" : "")}>
      <CardHeader className="p-0 mb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="text-lg">
            <CardTitle>{challenge.name}</CardTitle>
            <div className="text-sm text-gray-600 mt-1">{challenge.description}</div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Status</div>
            <div className={cn("mt-1 text-sm font-semibold", completed ? "text-green-600" : "text-sky-600")}>
              {statusLabel}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 mt-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-2">Progresso</div>
          <Progress value={current} max={target} showLabel />
          <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
            <div>
              {current} de {target}
              <div className="font-medium">{pct}%</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
            <div>
              <div className="text-xs text-gray-500">Período</div>
              <div className="mt-1">{periodText}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Recompensa</div>
              <div className="mt-1">
                <span className="font-semibold">{challenge.experienceReward} capital</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="font-semibold">{challenge.virtualCurrencyReward} dividendos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="text-xs text-gray-500">Criado: {new Date(challenge.createdAt).toLocaleDateString()}</div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={completed ? "secondary" : "default"}
              onClick={() => onAction?.(challengeType)}
              className="cursor-pointer"
            >
              {completed ? "Ver progresso" : started ? "Continuar" : "Começar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
