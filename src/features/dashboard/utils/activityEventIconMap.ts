import type { ActivityEventType } from "@/features/dashboard/constants/activityEventTypes";
import { BookOpen, ClipboardCheck, Medal, Target, Trophy } from "lucide-react";

export const activityEventIconMap: Record<ActivityEventType, { Icon: React.ElementType; colorClass: string }> = {
  content: {
    Icon: BookOpen,
    colorClass: "text-sky-500",
  },
  exercise: {
    Icon: ClipboardCheck,
    colorClass: "text-emerald-500",
  },
  achievement: {
    Icon: Trophy,
    colorClass: "text-yellow-500",
  },
  challenge: {
    Icon: Target,
    colorClass: "text-violet-500",
  },
};
