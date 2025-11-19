import { useEffect, useRef } from "react";
import type { ContentSectionDTO } from "../dtos/contentSectionDto";
import { Button } from "@/components/ui/Button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SectionBlockProps {
  section: ContentSectionDTO;
  isActive?: boolean;
  isContentCompleted?: boolean;
  completed?: boolean;
  onMarkComplete?: () => void;
  onNavigateNext?: () => void;
};

export const SectionBlock: React.FC<SectionBlockProps> = ({ section, isActive = false, isContentCompleted = false, completed = false, onMarkComplete, onNavigateNext }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [isActive])

  return (
    <article ref={ref} className={`border rounded-lg p-6 ${isActive ? "ring-2 ring-primary/30" : ""}`}>
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{section.title}</h3>
          <div className="text-xs text-gray-500">Seção {section.order + 1}</div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={completed ? "secondary" : "default"}
            className="cursor-pointer"
            onClick={onMarkComplete}
            disabled={isContentCompleted}
          >
            {completed ? "Mark as not completed" : "Mark completed"}
          </Button>
        </div>
      </header>

      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.body}</ReactMarkdown>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {onNavigateNext && (
          <Button
            size="sm"
            variant="ghost"
            className="cursor-pointer"
            onClick={onNavigateNext}
          >
            Next section
          </Button>
        )}
      </div>
    </article>
  );
};
