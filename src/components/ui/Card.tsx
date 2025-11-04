import { cn } from "@/lib/utils";
import React from "react";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref}
    className={cn(
      "rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";