import { useCallback, useEffect, useState } from "react";
import type { GamificationProfileDTO } from "../dtos/gamificationProfileDto";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { gamificationService } from "../services/gamificationService";

export function useGamificationProfile(userId: string) {
  const { user } = useAuth();
  const resolvedUserId = userId ?? user?.id;

  const [data, setData] = useState<GamificationProfileDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const load = useCallback(async () => {
    if (!resolvedUserId) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await gamificationService.getProfile(resolvedUserId);
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load profile");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [resolvedUserId]);

  const changeUsername = useCallback(async (newUsername: string) => {
    if (!resolvedUserId) throw new Error("User id missing");
    setSaving(true);

    try {
      const op = await gamificationService.changeUsername(resolvedUserId, newUsername);
      if (!op) throw new Error("Failed to change username");

      const updatedProfile = await gamificationService.getProfile(resolvedUserId);
      setData(updatedProfile);
      return true;
    } catch (err: any) {
      throw err;
    } finally {
      setSaving(false);
    }
  }, [resolvedUserId]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, saving, reload: load, changeUsername };
};
