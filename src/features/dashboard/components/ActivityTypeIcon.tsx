import React from "react";
import type { ActivityEventType } from "../constants/activityEventTypes";
import { activityEventIconMap } from "../utils/activityEventIconMap";
import { cn } from "@/lib/utils";

interface ActivityTypeIconProps {
  eventType?: ActivityEventType;
  className?: string;
  size?: number;
};

export const ActivityTypeIcon: React.FC<ActivityTypeIconProps> = ({ eventType, className, size = 20 }) => {
  if (!eventType|| !(eventType in activityEventIconMap)) {
    return (
      <div
        className={cn(
          "rounded-full bg-neutral-200",
          `w-[${size}px] h-[${size}px]`,
          className
        )}
        aria-hidden
      />
    );
  };

  const { Icon, colorClass } = activityEventIconMap[eventType];

  return (
    <Icon 
      className={cn(`w-[${size}px] h-[${size}px]`, colorClass, className)}
    />
  );
}