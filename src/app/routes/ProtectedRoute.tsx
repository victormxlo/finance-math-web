import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/context/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // TBI: Create spinner
    return null;
  }

  if (!user)
    return <Navigate to="/auth" replace />;

  return <>{children}</>;
};