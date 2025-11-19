import { useAuth } from "@/features/auth/hooks/useAuth";
import { motion } from "framer-motion";

export function WelcomeBanner() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-primary text-primary-foreground rounded-lg p-6 shadow-lg"
    >
      <h1 className="text-2xl font-bold">
        Bem-vindo{user?.fullName ? `, ${user.fullName}` : ""}!
      </h1>
      <p className="mt-2 text-primary-foreground/90 text-sm">
        Prepare-se para conquistar seus objetivos financeiros de forma divertida e interativa.
      </p>
    </motion.div>
  );
};
