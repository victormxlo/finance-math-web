import type { Content } from "@/features/content/dtos/content";
import type { FC } from "react";
import { mockContents } from "../mocks/mockContents";
import { Link } from "react-router-dom";
import { ContentCard } from "./ContentCard";

interface NextContentsProps {
  contents?: Content[];
  loading?: boolean;
  limit?: number;
};

export const NextContents: FC<NextContentsProps> = ({ contents, loading = false, limit = 3 }) => {
  const list = contents ?? mockContents;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: limit }).map((_, idx) => (
          <div key={idx} className="animate-pulse bg-neutral-100 rounded-lg h-48" />
        ))}
      </div>
    );
  }

  return (
    <section aria-labelledby="next-contents-title">
      <div className="flex items-center justify-between mb-4">
        <h2 id="next-contents-title" className="text-lg font-semibold">
          Next Contents
        </h2>
        <Link to="/contents" className="text-sm text-muted-foreground hover:underline">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.slice(0, limit).map((c: Content) => (
          <ContentCard key={c.id} content={c} />
        ))}
      </div>
    </section>
  );
};

