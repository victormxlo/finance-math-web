import { Navbar } from "@/components/navigation/Navbar";
import { Sidebar } from "@/components/navigation/Sidebar";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface PrivateLayoutProps {
  children: ReactNode;
};

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto bg-muted/20">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
};