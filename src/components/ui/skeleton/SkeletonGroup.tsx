import { cn } from "@/lib/utils";

export interface SkeletonGroupProps {
  count?: number;
  children: (index: number) => React.ReactNode;
  className?: string;
  wrapper?: string;
};

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({ count = 3, children, className }) => {
  const items = Array.from({ length: Math.max(0, count) }, (_, i) => children(i));
  return <div className={cn("flex flex-col gap-3", className)}>{items}</div>;
};

SkeletonGroup.displayName = "SkeletonGroup";
