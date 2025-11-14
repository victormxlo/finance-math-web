import type { ContentDTO } from "@/features/content/dtos/contentDto";
import { BookOpen, Clock } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export function ContentCard({ content }: { content: ContentDTO }) {
  const isNew = useMemo(() => {
    const created = new Date(content.createdAt);
    const diffDays = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 14;
  }, [content.createdAt]);
  
  return (
    <article
      className="bg-card rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition"
      aria-labelledby={`content-${content.id}-title`}
    >
      {content.mediaUrl ? (
        <img src={content.mediaUrl} alt="" className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-neutral-100 flex items-center justify-center text-neutral-400">
          <BookOpen className="w-8 h-8" />
        </div>
      )}

      <div className="p-4">
        <h3 id={`content-${content.id}-title`} className="font-semibold text-base">
          <Link to={`/contents/${content.id}`} className="hover:underline">
            {content.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {content.body}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <Clock className="w-4 h-4"/>
            <time dateTime={content.createdAt}>
              {new Date(content.createdAt).toLocaleDateString()}
            </time>
          </div>

          <div className="flex items-center gap-2">
            {isNew && (
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                New
              </span>
            )}
            <Link
              to={`/contents/${content.id}`}
              className="text-sm font-medium text-primary hover:underline"
              aria-label={`Access ${content.title}`}
            >
              Acessar
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
