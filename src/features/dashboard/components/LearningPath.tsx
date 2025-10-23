import { mockModules } from "../mocks/mockModules";
import { LearningPathItem } from "./LearningPathItem";

interface LearningPathProps {
  modules: {
    id: string;
    title: string;
    completed: number;
    total: number;
  }[];
}

export function LearningPath() {
  const items = mockModules.map((m) => ({
    id: m.categoryId,
    title: m.categoryName,
    completed: m.completedContents,
    total: m.totalContents,
  }));

  return (
    <section aria-labelledby="learning-path-title" className="space-y-4">
      <header>
        <h2 id="learning-path-title" className="text-lg font-semibold">
          Learning Path
        </h2>
      </header>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No content available.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((i) => (
            <LearningPathItem key={i.id} item={i} />
          ))}
        </ul>
      )}
    </section>
  );
};

