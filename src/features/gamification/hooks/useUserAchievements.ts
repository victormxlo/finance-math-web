import { useEffect, useState } from "react";
import { gamificationService } from "../services/gamificationService";
import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";
import { useLoading } from "@/app/hooks/useLoading";

export function useUserAchievements(userId: string) {
  const [achievements, setAchievements] = useState<AchievementDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    showLoading();
    const fetchData = async () => {
      try {
        const data = await gamificationService.getUserAchievements(userId);
        setAchievements(data);
      } finally {
        setIsLoading(false);
        hideLoading();
      }
    };
    fetchData();
  }, [userId, showLoading, hideLoading]);

  return { achievements, isLoading };
};
