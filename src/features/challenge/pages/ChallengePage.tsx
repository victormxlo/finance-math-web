import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useChallengeProgress } from "../hooks/useChallengeProgress";
import { useChallenges } from "../hooks/useChallenges";
import { useCallback, useMemo, useState, type FC } from "react";
import { ChallengeFilters } from "../components/ChallengeFilters";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { ChallengeList } from "../components/ChallengeList";

export const ChallengePage: FC = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const navigate = useNavigate();

  const { data: challenges, loading: loadingChallenges } = useChallenges(true);
  const { data: progressList, loading: loadingProgress } = useChallengeProgress(userId);

  const [filters, setFilters] = useState({
    search: "",
    status: "" as "" | "all" | "not-started" | "in-progress" | "completed",
    activeOnly: true,
  });

  const merged = useMemo(() => {
    type ProgressItem = NonNullable<typeof progressList>[number];

    const map = new Map<string, ProgressItem>();
    (progressList ?? []).forEach((p) => map.set(p.challengeId, p));

    return (challenges ?? []).map((c) => ({
      challenge: c,
      progress: map.get(c.id) ?? null,
    }));
  }, [challenges, progressList]);

  const filtered = useMemo(() => {
    return merged.filter(({ challenge, progress }) => {
      if (filters.activeOnly) {
        const now = Date.now();
        const start = Date.parse(challenge.startDate);
        const end = Date.parse(challenge.endDate);
        if (isNaN(start) || isNaN(end) || !(start <= now && now <= end)) return false;
      }

      if (filters.status && filters.status !== "all") {
        if (filters.status === "not-started" && progress) return false;
        if (filters.status === "in-progress" && (!progress || progress.isCompleted)) return false;
        if (filters.status === "completed" && (!progress || !progress.isCompleted)) return false;
      }

      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!challenge.name.toLowerCase().includes(q) && !challenge.description.toLowerCase().includes(q)) return false;
      }

      return true;
    });
  }, [merged, filters]);

  const isLoading = loadingChallenges || loadingProgress;

  const handleAction = useCallback(
    (type: "content" | "exercise") => {
      navigate(type === "content" ? "/contents" : "/exercises");
    },
    [navigate]
  );

  return (
    <div className="p-6 space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Desafios</h1>
          <p className="text-sm text-gray-600 mt-1">Acompanhe suas metas e recompensas em andamento.</p>
        </div>

        <div className="w-full sm:w-96">
          <ChallengeFilters filters={filters} onChange={setFilters} />
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
        </div>
      ) : (
        <ChallengeList items={filtered} onAction={handleAction} />
      )}
    </div>
  );
};
