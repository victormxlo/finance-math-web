import { cn } from "@/lib/utils";

export type SkeletonVariant = "rect" | "text" | "circle" | "avatar" | "card";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  className?: string;
  animate?: boolean;
  ariaLabel?: string;
  width?: string;
  height?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "rect",
  className = "",
  animate = true,
  ariaLabel = "Loading...",
  width,
  height,
  style,
  ...rest
}) => {
  const base = "bg-gray-200 dark:bg-gray-700 rounded-md";
  const animClass = animate ? "animate-pulse" : "";
  const variantClasses: Record<SkeletonVariant, string> = {
    rect: "rounded-md",
    text: "h-4 rounded-md",
    circle: "rounded-full",
    avatar: "rounded-full",
    card: "rounded-2xl",
  };

  const inlineStyle = {
    ...(style || {}),
    ...(width && width.includes("px") ? { width } : {}),
    ...(height && height.includes("px") ? { height } : {}),
  } as React.CSSProperties;

  const classWidth = width && !width.includes("px") ? width : "";
  const classHeight = height && !height.includes("px") ? height : "";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      {...rest}
      className={cn(base, animClass, variantClasses[variant], classWidth, classHeight, className)}
      style={inlineStyle}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Skeleton.displayName = "Skeleton";
