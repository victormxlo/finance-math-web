import { AuthPage } from "@/features/auth/pages/AuthPage";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage";
import { ContentPage } from "@/features/content/pages/ContentPage";
import { ExercisePage } from "@/features/exercise/pages/ExercisePage";
import { HomePage } from "@/features/home/pages/HomePage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { ChallengePage } from "@/features/challenge/pages/ChallengePage";
import { AchievementPage } from "@/features/achievement/pages/AchievementPage";
import { ContentDetailPage } from "@/features/content/pages/ContentDetailPage";
import { ExerciseDetailPage } from "@/features/exercise/pages/ExerciseDetailPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/contents" element={<ProtectedRoute><ContentPage /></ProtectedRoute>} />
      <Route path="/contents/:id" element={<ProtectedRoute><ContentDetailPage /></ProtectedRoute>} />
      <Route path="/achievements" element={<ProtectedRoute><AchievementPage /></ProtectedRoute>} />
      <Route path="/exercises" element={<ProtectedRoute><ExercisePage /></ProtectedRoute>} />
      <Route path="/exercises/:id" element={<ProtectedRoute><ExerciseDetailPage /></ProtectedRoute>} />
      <Route path="/challenges" element={<ProtectedRoute><ChallengePage /></ProtectedRoute>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
};
