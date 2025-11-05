import type { FC } from "react";
import type { ExerciseOptionPublicDTO } from "../dtos/exercisePublicOptionDto"
import { Button } from "@/components/ui/Button";

interface ExerciseOptionsListProps {
  options: ExerciseOptionPublicDTO[];
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
};

export const ExerciseOptionsList: FC<ExerciseOptionsListProps> = (
  { options, selectedOptionId, onSelect, disabled = false }
) => {
  return (
    <div className="flex flex-col gap-3 mt-6">
      {options.map((opt) => {
        const isSelected = opt.id === selectedOptionId;

        return (
          <Button
            key={opt.id}
            variant={isSelected ? "default" : "outline"}
            className={`justify-start text-left py-3 px-4 transition-all rounded-xl border ${
              isSelected
                ? "bg-primary text-white border-primary"
                : "hover:bg-gray-50"
            }`}
            disabled={disabled}
            onClick={() => onSelect(opt.id)}
          >
            <span className="text-sm font-medium">{opt.description}</span>
          </Button>
        )
      })}
    </div>
  );
};
