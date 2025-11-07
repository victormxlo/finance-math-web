import type React from "react";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import type { UserExerciseProgressDTO } from "../dtos/userExerciseProgressDto";
import { useNavigate } from "react-router-dom";
import { ExerciseCard } from "./ExerciseCard";

interface ExerciseListProps {
  exercises: ExerciseDTO[];
  progress: UserExerciseProgressDTO[];
};

export const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, progress }) => {
  const navigate = useNavigate();

  if (!exercises?.length) {
    return <p className="text-sm text-muted-foreground text-center py-12">Nenhum exercício encontrado.</p>
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {exercises.map((exercise) => {
        const completed = progress?.some((p) => p.exerciseId === exercise.id);

        return (
          <ExerciseCard 
            key={exercise.id}
            exercise={exercise}
            completed={completed}
            onStart={() => navigate(`/exercises/${exercise.id}`)}
          />
        );
      })}
    </div>
  );
};
