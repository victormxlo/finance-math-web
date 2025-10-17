import { motion } from "framer-motion";
import { quickStatsItems } from "../constants/quickStatsItems";

export function QuickStats() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {quickStatsItems.map((stat, index) => (
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
