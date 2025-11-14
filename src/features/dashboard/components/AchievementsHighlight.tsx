import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import type { FC } from "react";
import { mockAchievements } from "../mocks/mockAchievements";
import { AchievementCard } from "./AchievementCard";

interface AchievementsHighlightProps {
  achievements?: AchievementDTO[];
  loading?: boolean;
  limit?: number;
};

export const AchievementsHighlight: FC<AchievementsHighlightProps> = 
  ({ achievements, loading = false, limit = 3 }) => {
  const list = achievements ?? mockAchievements;

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, idx) => (
          <div key={idx} className="animate-pulse bg-neutral-100 rounded-lg h-28"></div>
        ))}
      </div>
    );
  };

  return (
    <section aria-labelledby="achievements-title">
      <div className="flex items-center justify-between mb-4">
        <h2 id="achievements-title" className="text-lg font-semibold">
          Conquistas
        </h2>
        <a href="/achievements" className="text-sm text-muted-foreground hover:underline">
          Ver todos
        </a>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-4 py-2">
          {list.slice(0, limit).map((a: AchievementDTO) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </div>
    </section>
  );
};