import { GlobalLoadingSpinner } from "@/components/loading/GlobalLoadingSpinner";
import { createContext, useCallback, useContext, useState } from "react";

interface LoadingContextValue {
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => setIsLoading(true), []);
  const hideLoading = useCallback(() => setIsLoading(false), []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {isLoading && <GlobalLoadingSpinner />}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoadingContext deve ser usado dentro de <LoadingProvider>");
  return ctx;
};