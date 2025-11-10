import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAchievementProgress } from "../hooks/useAchievementProgress";
import { useAchievements } from "../hooks/useAchievements";
import { AchievementGridSkeleton } from "../components/AchievementGridSkeleton";
import { AchievementList } from "../components/AchievementList";

export function AchievementPage() {
  const { user } = useAuth();

  const { data: achievements, loading: loadingAchievements } = useAchievements();
  const { data: progress, loading: loadingProgress } = useAchievementProgress(user!.id);

  const loading = loadingAchievements || loadingProgress;

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold mb-4">Conquistas</h1>
        <p className="text-sm text-muted-foreground">
          Alcance marcos e desbloqueie recompensas à medida que avança.
        </p>
      </header>

      {loading ? (
        <AchievementGridSkeleton />
      ) : (
        <AchievementList achievements={achievements!} progress={progress!} />
      )}
    </div>
  )
};
