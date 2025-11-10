import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { SkeletonGroup } from "@/components/ui/skeleton/SkeletonGroup";

export function AchievementGridSkeleton() {
  return (
    <SkeletonGroup>
      {(index) => (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="p-4 border rounded-2xl space-y-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      )}
    </SkeletonGroup>
  );
}