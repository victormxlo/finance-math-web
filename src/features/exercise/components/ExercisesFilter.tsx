import { Input } from "@/components/ui/input/Input";
import { Select } from "@/components/ui/Select";
import { ExerciseDifficulty } from "../constants/exerciseDifficulty";
import { Button } from "@/components/ui/Button";

interface ExerciseFiltersProps {
  filters: {
    search: string;
    difficulty: string;
    status: string;
  };
  onChange: (update: (prev: { search: string; difficulty: string, status: string }) 
    => { search: string; difficulty: string, status: string }) => void;
};

export function ExerciseFilters({ filters, onChange }: ExerciseFiltersProps) {
  const handleChange = (key: keyof ExerciseFiltersProps['filters'], value: string) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    onChange(() => ({ search: "", difficulty: "", status: "" }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Input
        placeholder="Buscar exercício..."
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        className="w-full sm:w-1/2"
      />

      <Select
        value={filters.difficulty}
        onChange={(v) => handleChange("difficulty", v)}
        options={[
          { value: "easy", label: "Fácil" },
          { value: "medium", label: "Médio" },
          { value: "hard", label: "Difícil" },
        ]}
        placeholder="Dificuldade"
        className="w-full sm:w-40"
      />

      <Select
        value={filters.status}
        onChange={(v) => handleChange("status", v)}
        options={[
          { value: "completed", label: "Concluído" },
          { value: "pending", label: "Pendente" },
        ]}
        placeholder="Status"
        className="w-full sm:w-40"
      />

      {(filters.search || filters.difficulty || filters.status) && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="whitespace-nowrap cursor-pointer"
        >
          Limpar filtros
        </Button>
      )}

    </div>
  )
};
