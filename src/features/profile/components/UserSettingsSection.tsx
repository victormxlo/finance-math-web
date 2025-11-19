import { useToast } from "@/app/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardTitle } from "@/components/ui/CardTitle";
import { Input } from "@/components/ui/input/Input";
import { useUserSettings } from "@/features/gamification/hooks/useUserSettings";
import { useState } from "react";

interface UserSettingsSectionProps {
  userId: string;
  currentUsername: string;
}

export function UserSettingsSection({
  userId,
  currentUsername,
}: UserSettingsSectionProps) {
  const { toast } = useToast();

  const [username, setUsername] = useState(currentUsername);
  const { changeUsername, changePassword, isChangingUsername, isChangingPassword } = useUserSettings(userId, currentUsername);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  const handleChangeUsername = async () => {
    if (!username.trim() || username === currentUsername) return;
    await changeUsername(username);
  };

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new) return;
    await changePassword(passwords.current, passwords.new);
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Alterar nome de usuário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Novo nome de usuário"
          />
          <Button
            onClick={handleChangeUsername}
            disabled={isChangingUsername || username === currentUsername}
          >
            {isChangingUsername ? "Salvando..." : "Salvar"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alterar senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="password"
            placeholder="Senha atual"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Nova senha"
            value={passwords.new}
            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
          />
          <Button
            onClick={handleChangePassword}
            disabled={isChangingPassword}
            variant="secondary"
          >
            {isChangingPassword ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}