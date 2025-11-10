import type { FC } from "react";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  name: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  experienceReward: number;
  virtualCurrencyReward: number;
};

export const AchievementCard: FC<AchievementCardProps> = ({ 
  name,
  description,
  unlocked,
  unlockedAt,
  experienceReward,
  virtualCurrencyReward,
 }) => {
  return (
    <div className={cn(
      "rounded-2xl p-4 border shadow-sm transition-all duration-300",
      unlocked
        ? "bg-primary/10 border-primary"
        : "bg-muted/20 border-transparent hover:border-muted foreground/20"
    )}>
      <div className="flex items-start justify-between">
        <Trophy 
          className={cn(
            "h-6 w-6",
            unlocked
              ? "text-primary"
              : "text-muted-foreground"
          )}
        />
        {unlocked && (
          <span className="text-xs text-muted-foreground">
            {new Date(unlockedAt!).toLocaleDateString()}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-semibold text-sm">{name}</h3>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>

      <div className="mt-3 flex gap-3 text-xs text-muted-foreground">
        <span>+{experienceReward} XP</span>
        <span>+{virtualCurrencyReward} coins</span>
      </div>
    </div>
  );
};
