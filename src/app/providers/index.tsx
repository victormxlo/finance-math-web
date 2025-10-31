import type { ReactNode } from "react";
import { AuthProvider } from "../../features/auth/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { FeedbackModalProvider } from "@/features/feedback/context/FeedbackModalContext";
import { FeedbackModal } from "@/features/feedback/components/FeedbackModal";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FeedbackModalProvider>
          <FeedbackModal />
          <Toaster />
            {children}
        </FeedbackModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
