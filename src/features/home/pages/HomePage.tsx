import { useAuth } from "@/features/auth/context/useAuth";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { LandingPage } from "./LandingPage";

export function HomePage() {
  const { user } = useAuth();

  if (user) {
    return <DashboardPage />
  };

  return <LandingPage />
};
