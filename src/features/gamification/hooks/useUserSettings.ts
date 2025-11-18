import { useToast } from "@/app/hooks/useToast";
import { gamificationService } from "../services/gamificationService";
import { useState } from "react";
import { useLoading } from "@/app/hooks/useLoading";

export function useUserSettings(userId: string, currentUsername: string) {
  const { toast } = useToast();
  const [isChangingUsername, setIsChangingUsername] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const { showLoading, hideLoading } = useLoading();

  const changeUsername = async (newUsername: string) => {
    setIsChangingUsername(true);
    showLoading();
    try {
      const success = await gamificationService.changeUsername(userId, newUsername);
      toast({
        description: success
          ? "Username updated successfully."
          : "Could not update username.",
        variant: success ? "default" : "destructive",
      });
    } catch {
      toast({ description: "An error occurred while updating username.", variant: "destructive" });
    } finally {
      setIsChangingUsername(false);
      hideLoading();
    }
  };

  const changePassword = async (current: string, next: string) => {
    setIsChangingPassword(true);
    showLoading();
    try {
      const success = await gamificationService.changePassword(userId, current, next);
      toast({
        description: success
          ? "Password changed successfully."
          : "Invalid credentials or request failed.",
        variant: success ? "default" : "destructive",
      });
    } catch {
      toast({ description: "An error occurred while changing password.", variant: "destructive" });
    } finally {
      setIsChangingPassword(false);
      hideLoading();
    }
  };

  return {
    changeUsername,
    changePassword,
    isChangingUsername,
    isChangingPassword,
  };
}