import Progress from "@/components/ui/Progress";
import type { ChallengeDTO } from "@/features/challenge/dtos/challengeDto"
import { cn } from "@/lib/utils";
import { CheckCircle2, Flag } from "lucide-react";

interface ChallengeItemProps {
  challenge: ChallengeDTO;
};

export function ChallengeItem({ challenge }: ChallengeItemProps) {
  const percent = Math.min(100, Math.round((challenge.currentProgress / challenge.targetProgress) * 100));

  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all duration-300",
      challenge.isCompleted
        ? "border-green-400 bg-green-50/50 dark:bg-green-950/20"
        : "border-muted bg-muted/40 hover:bg-muted/60"
    )}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-foreground">
          {challenge.name}
        </h3>

        {challenge.isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ): (
          <Flag className="w-4 h-4 text-primary" />
        )}
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        {challenge.description}
      </p>

      <Progress value={percent} showLabel />

      <div className="mt-2 text-xs text-muted-foreground">
        {challenge.isCompleted
          ? `Completed on ${new Date(challenge.completedAt || "").toLocaleDateString()}`
          : `${challenge.currentProgress} / ${challenge.targetProgress} goals`}
      </div>
    </div>
  );
};
