import { useMemo, useState } from "react";
import { useExerciseProgress } from "../hooks/useExerciseProgress";
import { useExercises } from "../hooks/useExercises"
import type { ExerciseDTO } from "../dtos/exerciseDto";
import type { UserExerciseProgressDTO } from "../dtos/userExerciseProgressDto";
import { ExerciseFilters } from "../components/ExercisesFilter";
import { ExerciseList } from "../components/ExerciseList";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function ExercisePage() {
  const { user } = useAuth();
  const userId = user?.id;

  const { data: exercises, loading } = useExercises();
  const { data: progress } = useExerciseProgress(userId);
  const [filters, setFilters] = useState({ search: '', difficulty: '', status: '' });

  const filtered = useMemo(() => {
    if (exercises) {
      return exercises
        .filter((ex: ExerciseDTO) => !filters.difficulty || ex.difficulty === filters.difficulty) 
        .filter((ex: ExerciseDTO) => !filters.search || ex.question.toLowerCase().includes(filters.search.toLowerCase()))
        .filter((ex: ExerciseDTO) => {
          if (!filters.status) return true;

          const isCompleted = progress?.some((p: UserExerciseProgressDTO) => p.exerciseId === ex.id);
          return filters.status === "completed" ? isCompleted : !isCompleted;
        });
    }
    }, [exercises, progress, filters]);

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold mb-4">Exercícios</h1>
        <ExerciseFilters filters={filters} onChange={setFilters} />
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton variant="card" className="h-36" />
          <Skeleton variant="card" className="h-36" />
          <Skeleton variant="card" className="h-36" />
          <Skeleton variant="card" className="h-36" />
          <Skeleton variant="card" className="h-36" />
          <Skeleton variant="card" className="h-36" />
        </div>
      ) : (
        <ExerciseList exercises={filtered || []} progress={progress!} />
      )}
    </div>
  )
};
