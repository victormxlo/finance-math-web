import { useAuth } from "@/app/providers/auth/useAuth";
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
        Welcome{user?.fullName ? `, ${user.fullName}` : ""}!
      </h1>
      <p className="mt-2 text-primary-foreground/90 text-sm">
        Continue your journey into financial mathematics. Let's learn more today?
      </p>
    </motion.div>
  );
};
