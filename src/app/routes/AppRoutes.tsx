import { AuthPage } from "@/features/auth/pages/AuthPage";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
};
