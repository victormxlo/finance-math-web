import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";

interface AchievementItemShowcase extends AchievementDTO {
  iconUrl?: string;
}

interface AchievementsShowcaseProps {
  achievements?: AchievementItemShowcase[];
  isLoading?: boolean;
};

export function AchievementsShowcase({
  achievements,
  isLoading,
}: AchievementsShowcaseProps) {
  if (isLoading) {
    return (
      <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-20 h-20 rounded-full" />
        ))}
      </div>
    );
  }

  if (!achievements || achievements.length === 0) {
    return (
      <p className="text-sm text-muted-foreground mt-6">
        Não há conquistas desbloqueadas até o momento.
      </p>
    );
  }

  return (
    <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
      {achievements.map((achievement) => (
        <Card
          key={achievement.id}
          className="w-20 h-20 rounded-full flex items-center justify-center relative shadow-sm hover:shadow-md transition"
        >
          {achievement.iconUrl ? (
            <img
              src={achievement.iconUrl}
              alt={achievement.name}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
              {achievement.name[0]}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};