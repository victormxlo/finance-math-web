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
          ? "Nome de usuário alterado com sucesso."
          : "Não é possível alterar o nome de usuário.",
        variant: success ? "default" : "destructive",
      });
    } catch (err: any) {
      toast({ description: err?.message ?? "Ocorreu um erro no processo de alteração do nome de usuário", variant: "destructive" });
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
          ? "Senha alterada com sucesso."
          : "Credenciais inválidas ou falha na requisição.",
        variant: success ? "default" : "destructive",
      });
    } catch {
      toast({ description: "Ocorreu um erro no processo de alteração da senha.", variant: "destructive" });
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