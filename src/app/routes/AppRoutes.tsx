import { AuthPage } from "@/features/auth/pages/AuthPage";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage";
import { HomePage } from "@/features/home/pages/HomePage";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
};
