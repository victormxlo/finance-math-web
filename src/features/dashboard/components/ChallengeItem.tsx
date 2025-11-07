import Progress from "@/components/ui/Progress";
import type { UserChallengeProgressDTO } from "@/features/challenge/dtos/userChallengeProgressDto";
import { cn } from "@/lib/utils";
import { CheckCircle2, Flag } from "lucide-react";

interface ChallengeItemProps {
  challengeProgress: UserChallengeProgressDTO;
};

export function ChallengeItem({ challengeProgress }: ChallengeItemProps) {
  const percent = Math.min(100, Math.round((challengeProgress.currentProgress / challengeProgress.targetProgress) * 100));

  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all duration-300",
      challengeProgress.isCompleted
        ? "border-green-400 bg-green-50/50 dark:bg-green-950/20"
        : "border-muted bg-muted/40 hover:bg-muted/60"
    )}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-foreground">
          {challengeProgress.challengeName}
        </h3>

        {challengeProgress.isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ): (
          <Flag className="w-4 h-4 text-primary" />
        )}
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        {challengeProgress.challengeDescription}
      </p>

      <Progress value={percent} showLabel />

      <div className="mt-2 text-xs text-muted-foreground">
        {challengeProgress.isCompleted
          ? `Completed on ${new Date(challengeProgress.completedAt || "").toLocaleDateString()}`
          : `${challengeProgress.currentProgress} / ${challengeProgress.targetProgress} goals`}
      </div>
    </div>
  );
};
