import type { ReactNode } from "react";
import { AuthProvider } from "../../features/auth/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FeedbackModalProvider } from "@/features/feedback/context/FeedbackModalContext";
import { FeedbackModal } from "@/features/feedback/components/FeedbackModal";
import { LoadingProvider } from "@/context/LoadingContext";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AuthProvider>
          <FeedbackModalProvider>
              <FeedbackModal />
              {children}
          </FeedbackModalProvider>
        </AuthProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
};
