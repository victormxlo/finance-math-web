import { useCallback, useEffect, useState } from "react";
import type { GamificationProfileDTO } from "../dtos/gamificationProfileDto";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { gamificationService } from "../services/gamificationService";
import { useLoading } from "@/app/hooks/useLoading";

export function useGamificationProfile(userId: string) {
  const { user } = useAuth();
  const resolvedUserId = userId ?? user?.id;

  const [data, setData] = useState<GamificationProfileDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const { showLoading, hideLoading } = useLoading();

  const load = useCallback(async () => {
    if (!resolvedUserId) {
      setData(null);
      return;
    }

    setLoading(true);
    showLoading();
    setError(null);

    try {
      const response = await gamificationService.getProfile(resolvedUserId);
      setData(response);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao carregar perfil");
      setData(null);
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [resolvedUserId, showLoading, hideLoading]);

  const changeUsername = useCallback(async (newUsername: string) => {
    if (!resolvedUserId) throw new Error("User id missing");
    setSaving(true);
    setLoading(true);
    showLoading();

    try {
      const op = await gamificationService.changeUsername(resolvedUserId, newUsername);
      if (!op) throw new Error("Falha ao modificar nome de usuário");

      const updatedProfile = await gamificationService.getProfile(resolvedUserId);
      setData(updatedProfile);
      return true;
    } catch (err: any) {
      throw err;
    } finally {
      setSaving(false);
      setLoading(false);
      hideLoading();
    }
  }, [resolvedUserId, showLoading, hideLoading]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, saving, reload: load, changeUsername };
};
