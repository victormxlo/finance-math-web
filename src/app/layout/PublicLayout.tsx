import Footer from "@/components/layout/Footer";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface PublicLayoutProps {
  children: ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
        <Outlet />
      </main>
      <Footer />
		</div>
  )
};

