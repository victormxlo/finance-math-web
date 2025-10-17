import { BookCheck, BookOpen, Calendar, Star, Timer, Trophy } from "lucide-react";

type QuickStatsItem = {
  icon: React.ComponentType<{ className: string }>;
  label: string;
  value: any;
}

export const quickStatsItems: QuickStatsItem[] = [
  { icon: BookOpen, label: "Completed Contents", value: 5 },
  { icon: BookCheck, label: "Solved Exercises", value: 5 },
  { icon: Trophy, label: "Completed Challenges", value: 5 },
  { icon: Star, label: "Achievements", value: 3 },
  { icon: Timer, label: "Study Time", value: "3h 45min" },
  { icon: Calendar, label: "Current Streak", value: "5 days" }
];
