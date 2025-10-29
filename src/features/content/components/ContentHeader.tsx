import { Button } from "@/components/ui/Button";
import { formatDate } from "@/shared/utils/formatDate";
import type { FC } from "react";

interface ContentHeaderProps {
  title: string;
  categoryId: string;
  createdAt: string;
  sectionsCount: number;
  onComplete: () => Promise<void>;
  completing?: boolean;
  allCompleted?: boolean;
};
export const ContentHeader: React.FC<ContentHeaderProps> = ({ title, createdAt, sectionsCount, onComplete, completing = false, allCompleted = false }) => {
  return (
    <header className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold leading-tight">{title}</h1>
          <div className="mt-2 text-sm text-gray-600">
            <span>{formatDate(createdAt)}</span>
            <span className="mx-2">•</span>
            <span>{sectionsCount} sections</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={allCompleted ? "secondary" : "default"}
            className="cursor-pointer"
            size="sm"
            onClick={onComplete}
            disabled={completing}
          >
            {completing ? "Completing" : allCompleted ? "Completed" : "Complete content"}
          </Button>
        </div>
      </div>
    </header>
  );
};
