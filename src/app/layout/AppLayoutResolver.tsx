import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { publicRoutes } from "@/app/routes/publicRoutes";
import { PublicLayout } from "@/app/layout/PublicLayout";
import { useAuth } from "@/app/providers/auth/useAuth";
import { PrivateLayout } from "./PrivateLayout";

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
