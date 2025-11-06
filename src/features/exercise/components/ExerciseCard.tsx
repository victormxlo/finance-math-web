import { Badge, CheckCircle, PlayCircle } from "lucide-react";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import { exerciseDifficultyColors } from "../constants/exerciseDifficultyColors";
import { Button } from "@/components/ui/Button";

interface ExerciseCardProps {
  exercise: ExerciseDTO;
  completed?: boolean;
  onStart?: () => void;
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, completed = false, onStart }) => {
  return (
    <div className="rounded-2xl shadow-sm border bg-white p-6 hover:shadow-md transition-all">
      <h3 className="font-semibold text-lg mb-3 line-clamp-2">{exercise.question}</h3>

      <div className="flex items-center justify-between mb-4">
        <Badge className={exerciseDifficultyColors[exercise.difficulty]}>
          {exercise.difficulty.charAt(0).toUpperCase()}
        </Badge>
        {completed ? (
          <span className="text-green-600 text-sm flex items-center gap-1">
            <CheckCircle size={13} /> Concluído
          </span>
        ) : (
          <span className="text-gray-500 text-sm">Pendente</span>
        )}
      </div>

      <Button
        variant={completed ? "secondary" : "default"}
        size="sm"
        className="w-full cursor-pointer"
        onClick={onStart}
      >
        {completed ? (
          <>
            <CheckCircle size={16} className="mr-2" /> Revisar exercício
          </>
        ) : (
          <>
            <PlayCircle size={16} className="mr-2" /> Iniciar exercício
          </>
        )}
      </Button>
    </div>
  );
};