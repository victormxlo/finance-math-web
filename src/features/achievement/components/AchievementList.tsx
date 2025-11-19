import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import type { UserAchievementDTO } from "@/features/achievement/dtos/userAchievementDto";
import { AchievementCard } from "@/features/achievement/components/AchievementCard";
import type { FC } from "react";

interface AchievementListProps {
  achievements: AchievementDTO[];
  progress: UserAchievementDTO[];
};

export const AchievementList: FC<AchievementListProps> = ({ achievements, progress }) => {
  const safeProgress = Array.isArray(progress) ? progress : [];
  const map = new Map(safeProgress.map((p) => [p.achievementId, p]));

  const safeAchievements = Array.isArray(achievements) ? achievements : [];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {safeAchievements.map((a) => {
        const unlocked = map.get(a.id);

        return (
          <AchievementCard 
            key={a.id}
            name={a.name}
            description={a.description}
            unlocked={!!unlocked}
            unlockedAt={unlocked?.unlockedAt}
            experienceReward={a.experienceReward}
            virtualCurrencyReward={a.virtualCurrencyReward}
          />
        );
      })}
    </div>
  );
};
