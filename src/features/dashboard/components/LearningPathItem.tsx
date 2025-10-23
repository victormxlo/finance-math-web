import Progress from "@/components/ui/Progress";

interface LearningPathItemProps {
  item: {
    id: string;
    title: string;
    completed: number;
    total: number;
  };
};

export function LearningPathItem({ item }: LearningPathItemProps) {
  const progress = (item.completed / item.total) * 100;

  return (
    <li className="rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium leading-none">{item.title}</h3>
        <span className="text-xs text-muted-foreground">
          {item.completed}/{item.total}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </li>
  );
};
