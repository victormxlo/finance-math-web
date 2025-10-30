import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { publicRoutes } from "@/app/routes/publicRoutes";
import { PublicLayout } from "@/app/layout/PublicLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PrivateLayout } from "@/app/layout/PrivateLayout";

interface LayoutProps {
  children: ReactNode;
};

export function AppLayoutResolver({ children } : LayoutProps) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (isPublicRoute && !isAuthenticated) {
    return <PublicLayout>{children}</PublicLayout>;
  };

  return <PrivateLayout>{children}</PrivateLayout>
};
