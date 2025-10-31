import { Button } from "@/components/ui/Button";
import { formatDate } from "@/shared/utils/formatDate";

interface ContentHeaderProps {
  title: string;
  categoryId: string;
  createdAt: string;
  sectionsCount: number;
  onComplete: () => Promise<void>;
  completing?: boolean;
  allCompleted?: boolean;
  isContentCompleted?: boolean;
};
export const ContentHeader: React.FC<ContentHeaderProps> = ({ title, createdAt, sectionsCount, onComplete, completing = false, allCompleted = false, isContentCompleted = false }) => {
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
            variant={isContentCompleted ? "secondary" : "default"}
            className="cursor-pointer"
            size="sm"
            onClick={onComplete}
            disabled={isContentCompleted || completing || !allCompleted}
          >
            {isContentCompleted ? "Conteúdo concluído" : completing ? "Concluindo..." : "Concluir conteúdo"}
          </Button>
        </div>
      </div>
    </header>
  );
};
