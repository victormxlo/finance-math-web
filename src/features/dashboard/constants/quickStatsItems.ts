import { BookCheck, BookOpen, Calendar, Star, Timer, Trophy } from "lucide-react";

type QuickStatsItem = {
  icon: React.ComponentType<{ className: string }>;
  label: string;
  value: any;
}

export const quickStatsItems: QuickStatsItem[] = [
  { icon: BookOpen, label: "Conteúdos concluídos", value: 5 },
  { icon: BookCheck, label: "Exercícios resolvidos", value: 5 },
  { icon: Trophy, label: "Desafios completados", value: 5 },
  { icon: Star, label: "Conquistas", value: 3 },
  { icon: Timer, label: "Tempo de estudo", value: "3h 45min" },
  { icon: Calendar, label: "Streak atual", value: "5 dias" }
];
