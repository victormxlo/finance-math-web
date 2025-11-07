import { Input } from "@/components/ui/input/Input";
import { Select } from "@/components/ui/Select";
import type { FC } from "react";

interface Filters {
  search: string;
  status: "" | "all" | "not-started" | "in-progress" | "completed";
  activeOnly: boolean;
};

interface ChallengeFilterProps {
  filters: Filters;
  onChange: (next: Filters) => void;
};

export const ChallengeFilters: FC<ChallengeFilterProps> = ({ filters, onChange }) => {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <Input
        placeholder="Buscar desafios..."
        value={filters.search}
        onChange={(e) => set({ search: e.target.value })}
        className="w-full sm:flex-1"
      />

      <div className="w-full sm:w-56">
        <Select
          value={filters.status}
          placeholder="Status"
          options={[
            { value: "", label: "Todos" },
            { value: "not-started", label: "Não iniciados" },
            { value: "in-progress", label: "Em andamento" },
            { value: "completed", label: "Concluídos" },
          ]}
          onChange={(v) => set({ status: v as Filters["status"] })}
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          value={filters.activeOnly ? "true" : "false"}
          placeholder="Período"
          options={[
            { value: "false", label: "Todos períodos" },
            { value: "true", label: "Apenas ativos" },
          ]}
          onChange={(v) => set({ activeOnly: v === "true" })}
        />
      </div>
    </div>
  );
};
