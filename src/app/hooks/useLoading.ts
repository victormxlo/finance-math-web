import { useLoadingContext } from "@/context/LoadingContext";

export const useLoading = () => {
  const { showLoading, hideLoading } = useLoadingContext();
  return { showLoading, hideLoading };
};
