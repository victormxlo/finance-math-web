import { cn } from "@/lib/utils";
import React from "react";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 pb-0", className)} {...props} />
));

CardHeader.displayName = "CardHeader";