import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import { Coins, Gift, Star } from "lucide-react";

export function AchievementCard({ achievement }: { achievement: AchievementDTO } ) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border min-w-[220px]">
      <div className="flex items-start gap-3">
        <div className="bg-yellow-50 text-yellow-700 rounded-md p-2">
          <Star className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{achievement.name}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {achievement.description}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="inline-flex items-center gap-1">
              <Gift className="w-4 h-4" /> 
              <span>{achievement.experienceReward} XP</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <Coins className="w-4 h-4" /> 
              <span>{achievement.experienceReward}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
