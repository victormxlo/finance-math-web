import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardTitle } from "@/components/ui/CardTitle";
import type { FC } from "react";
import { ExerciseDifficulty } from "../constants/exerciseDifficulty";

interface ExerciseQuestionCardProps {
  question: string;
  difficulty?: string;
};

export const ExerciseQuestionCard: FC<ExerciseQuestionCardProps> = ({ question, difficulty }) => {
  const difficultyLabel =
    difficulty?.toLowerCase() === "easy"
      ? ExerciseDifficulty.easy
      : difficulty?.toLowerCase() === "medium"
      ? ExerciseDifficulty.medium
      : difficulty?.toLowerCase() === "hard"
      ?  ExerciseDifficulty.hard
      : "";

  return (
    <Card className="rounded-2xl shadow-sm border bordery-gray-200 bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Questão
          </CardTitle>
          {difficultyLabel && (
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                difficultyLabel === ExerciseDifficulty.easy
                  ? "bg-green-100 text-green-700"
                  : difficultyLabel === ExerciseDifficulty.medium
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {difficultyLabel}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base text-gray-700 leading-relaxed">{question}</p>
      </CardContent>
    </Card>
  );
};