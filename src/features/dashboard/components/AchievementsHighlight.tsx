import type { FC } from "react";
import { AchievementCard } from "./AchievementCard";
import { useAchievementsHighlight } from "../hooks/useAchievementsHighlight";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Link } from "react-router-dom";

interface AchievementsHighlightProps {
  loading?: boolean;
  limit?: number;
};

export const AchievementsHighlight: FC<AchievementsHighlightProps> = 
  ({ loading = false, limit = 3 }) => {
  const { user } = useAuth();
  const { achievements } = useAchievementsHighlight(user?.id);

  if (loading) {
    return (
      <section aria-labelledby="achievements-title">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-neutral-100 rounded-lg h-28"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="achievements-title">
      <div className="flex items-center justify-between mb-4">
        <h2 id="achievements-title" className="text-lg font-semibold">
          Conquistas
        </h2>
        <Link to="/achievements" className="text-sm text-muted-foreground hover:underline">
          Ver todos
        </Link>
      </div>

      {achievements.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma conquista pendente.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-flex gap-4 py-2">
            {achievements.slice(0, limit).map((a) => (
              <AchievementCard key={a.id} achievement={a} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
