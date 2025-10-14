import type { ReactNode } from "react";
import { Navbar } from "../../components/navigation/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth/useAuth";
import { publicRoutes } from "../routes/publicRoutes";

interface LayoutProps {
  children: ReactNode;
};

export function Layout({children} : LayoutProps) {
  const location = useLocation();
  const { user } = useAuth();

  const isPublicRoute = publicRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isPublicRoute && user && <Navbar />}
      <main className="flex-1 p-4">
        {children}
        <Outlet />
      </main>
		</div>
  )
};
