import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGamificationProfile } from "@/features/gamification/hooks/useGamificationProfile";

export function useNavbarProfile() {
  const { user } = useAuth();
  const userId = user?.id;

  const { data: profile, loading: profileLoading, error } = useGamificationProfile(userId!);

  const username = user?.username ?? profile?.username ?? "Usuário";

  const xp = profile?.experiencePoints ?? 0;
  const levelName = profile?.levelName ?? undefined;
  const virtualCurrency = profile?.virtualCurrency ?? 0;
  const loading = profileLoading;

  return {
    username,
    xp,
    levelName,
    virtualCurrency,
    loading,
    error,
    userId
  };
};
