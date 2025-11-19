import { motion } from "framer-motion";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuickStats } from "../hooks/useQuickStats";
import { BookOpen, BookCheck, Trophy, Star, Calendar } from "lucide-react";

export function QuickStats() {
  const { user } = useAuth();
  const { data } = useQuickStats(user?.id);

  const items = [
    { icon: BookOpen, label: "Conteúdos concluídos", value: data?.completedContents ?? "-" },
    { icon: BookCheck, label: "Exercícios resolvidos", value: data?.resolvedExercises ?? "-" },
    { icon: Trophy, label: "Desafios completados", value: data?.completedChallenges ?? "-" },
    { icon: Star, label: "Conquistas", value: data?.achievements ?? "-" },
    { icon: Calendar, label: "Streak atual", value: data?.currentStreak ?? "-" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-flow-col auto-cols-fr gap-4"
    >
      {items.map((stat, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="bg-card rounded-lg p-4 flex flex-col items-center shadow-sm border"
        >
          <stat.icon className="h-6 w-6 text-primary mb-2" />
          <span className="text-2xl font-bold">{stat.value}</span>
          <span className="text-sm text-muted-foreground text-center">{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
