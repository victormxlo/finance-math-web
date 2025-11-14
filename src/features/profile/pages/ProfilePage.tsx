import { useAuth } from "@/features/auth/hooks/useAuth";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { useGamificationProfile } from "@/features/gamification/hooks/useGamificationProfile"
import { useUserAchievements } from "@/features/gamification/hooks/useUserAchievements";
import { SummaryCardsSection } from "../components/SummaryCardsSection";
import { AchievementsShowcase } from "../components/AchievementsShowcase";
import { UserSettingsSection } from "../components/UserSettingsSection";
import { useEffect } from "react";
import { SkeletonGroup } from "@/components/ui/skeleton/SkeletonGroup";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProfilePage() {
  const { user } = useAuth();
  const userId = user?.id;
  const {
    data: profile,
    loading: loadingProfile,
    reload: refreshProfile,
  } = useGamificationProfile(userId ?? "");

  const {
    achievements,
    isLoading: loadingAchievements,
  } = useUserAchievements(userId ?? "");

  useEffect(() => {
    if (!userId) return;
    refreshProfile();
  }, [userId, refreshProfile]);

  if (loadingProfile) {
    return (
      <div className="p-6 space-y-8">
        <SkeletonGroup>
          {() => (
            <Skeleton className="h-16 w-16 rounded-full" />
          )}
        </SkeletonGroup>

        <SkeletonGroup>
          {() => (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          )}
        </SkeletonGroup>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Perfil não encontrado.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      <ProfileHeader
        username={profile.username}
        levelName={profile.levelName}
        levelId={profile.levelId}
        experiencePoints={profile.experiencePoints}
        currentStreakDays={profile.currentStreakDays}
      />

      <SummaryCardsSection
        levelName={profile.levelName}
        experiencePoints={profile.experiencePoints}
        virtualCurrency={profile.virtualCurrency}
        currentStreakDays={profile.currentStreakDays}
      />

      <div>
        {loadingAchievements ? (
          <SkeletonGroup>
            {() => (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
          </SkeletonGroup>
        ) : (
          <AchievementsShowcase achievements={achievements} />
        )}
      </div>

      <UserSettingsSection
        userId={profile.userId}
        currentUsername={profile.username}
      />
    </div>
  );
}