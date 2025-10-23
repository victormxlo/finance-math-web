import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  className?: string;
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, max = 100, showLabel = false, className, ...props }, ref) => {
    const safeMax = Math.max(1, max);
    const clamped = Math.max(0, Math.min(value, safeMax));
    const percent = Math.round((clamped / safeMax) * 100);

    return (
      <div className={cn("flex items-center gap-3", className)} ref={ref} {...props}>
        <div
          className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2.5 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={safeMax}
          aria-valuenow={Math.round(clamped)}
          aria-label={`Progress ${percent}%`}
        >
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${percent}%` }}
            data-testid="progress-bar-fill"
          />
        </div>

        {showLabel && (
          <div className="text-xs text-muted-foreground tabular-nums w-12 text-right">
            {percent}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export default Progress;
