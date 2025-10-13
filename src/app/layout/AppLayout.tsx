import type { ReactNode } from "react";
import { Navbar } from "../../components/navigation/Navbar";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
};

export function AppLayout({children} : LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        {children}
        <Outlet />
      </main>
		</div>
  )
};
