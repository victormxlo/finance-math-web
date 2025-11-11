import { useCallback } from "react";
import { toast as sonnerToast } from "sonner";

export function useToast() {
  const toast = useCallback(
    (options: { description: string; variant?: "default" | "destructive" }) => {
      sonnerToast[options.variant === "destructive" ? "error" : "success"](
        options.description
      );
    },
    []
  );
  return { toast };
};
