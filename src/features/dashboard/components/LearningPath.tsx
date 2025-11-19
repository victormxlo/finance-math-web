import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLearningPath } from "../hooks/useLearningPath";
import { LearningPathItem } from "./LearningPathItem";

export function LearningPath() {
  const { user } = useAuth();
  const { data } = useLearningPath(user?.id);

  return (
    <section aria-labelledby="learning-path-title" className="space-y-4">
      <header>
        <h2 id="learning-path-title" className="text-lg font-semibold">
          Caminho de aprendizagem
        </h2>
      </header>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhum conteúdo disponível.
        </p>
      ) : (
        <ul className="space-y-3">
          {data.map((i) => (
            <LearningPathItem key={i.id} item={i} />
          ))}
        </ul>
      )}
    </section>
  );
};

