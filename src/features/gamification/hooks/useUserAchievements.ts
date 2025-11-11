import { useEffect, useState } from "react";
import { gamificationService } from "../services/gamificationService";
import type { AchievementDTO } from "@/features/achievement/dtos/achievementDto";

export function useUserAchievements(userId: string) {
  const [achievements, setAchievements] = useState<AchievementDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const data = await gamificationService.getUserAchievements(userId);
        setAchievements(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return { achievements, isLoading };
};
