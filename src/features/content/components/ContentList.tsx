import { ContentCard } from "@/features/content/components/ContentCard";
import type { ContentDTO } from "@/features/content/dtos/contentDto";
import { useNavigate } from "react-router-dom";

interface ContentListProps {
  contents: ContentDTO[];
  completedIds?: Set<string>;
  onBack?: () => void;
  onOpen?: (id: string) => void;
}

export const ContentList: React.FC<ContentListProps> = ({ contents, completedIds, onBack, onOpen }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      {onBack && (
        <button
          onClick={onBack}
          className="px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          ← Back to Subcategories
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {contents.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            completed={completedIds?.has(content.id)}
            onOpen={() => navigate(`/contents/${content.id}`)}
          />
        ))}
      </div>
    </div>
  );
};