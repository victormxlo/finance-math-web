import { cn } from "@/lib/utils";
import React from "react";

interface AvatarInitialsProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string | null;
  size?: number;
  className?: string;
};

export const AvatarInitials: React.FC<AvatarInitialsProps> = ({ name, size = 88, className, ...props }) => {
  const initials = React.useMemo(() => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [name]);

  const colorIndex = React.useMemo(() => {
    if (!name) return 0;
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h << 5) - h + name.charCodeAt(i);
    return Math.abs(h) % 6;
  }, [name]);

  const bgClasses = [
    "bg-indigo-100 text-indigo-700",
    "bg-emerald-100 text-emerald-700",
    "bg-rose-100 text-rose-700",
    "bg-amber-100 text-amber-700",
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
  ];

  return (
    <div
      {...props}
      style={{ width: size, height: size }}
      className={cn(
        "flex items-center justify-center rounded-full font-semibold select-none",
        "shadow-sm",
        bgClasses[colorIndex],
        className
      )}
      aria-hidden={false}
      aria-label={name ?? "Avatar"}
    >
      <span style={{ fontSize: Math.round(size / 2.8) }}>{initials}</span>
    </div>
  );
};
