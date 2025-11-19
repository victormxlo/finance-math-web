import type { FC } from "react";
import { Link } from "react-router-dom";
import { ContentCard } from "./ContentCard";
import { useNextContents } from "../hooks/useNextContents";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface NextContentsProps {
  loading?: boolean;
  limit?: number;
};

export const NextContents: FC<NextContentsProps> = ({ loading = false, limit = 3 }) => {
  const { user } = useAuth();
  const { contents } = useNextContents(user?.id);

  if (loading) {
    return (
      <section aria-labelledby="next-contents-title">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: limit }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-neutral-100 rounded-lg h-48"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="next-contents-title">
      <div className="flex items-center justify-between mb-4">
        <h2 id="next-contents-title" className="text-lg font-semibold">
          Próximos conteúdos
        </h2>
        <Link to="/contents" className="text-sm text-muted-foreground hover:underline">
          Ver todos
        </Link>
      </div>


      {contents.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum conteúdo pendente.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.slice(0, limit).map((c) => (
            <ContentCard key={c.id} content={c} />
          ))}
        </div>
      )}
    </section>
  );
};

