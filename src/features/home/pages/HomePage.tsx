import { useAuth } from "@/features/auth/hooks/useAuth";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { LandingPage } from "./LandingPage";

export function HomePage() {
  const { user } = useAuth();

  if (user) {
    return <DashboardPage />
  };

  return <LandingPage />
};
