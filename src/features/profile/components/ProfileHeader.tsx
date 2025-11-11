import { AvatarInitials } from "@/components/ui/AvatarInitials";
import { Button } from "@/components/ui/Button";
import Progress from "@/components/ui/Progress";
import { useState, type FC } from "react";

interface ProfileHeaderProps {
  username?: string | null;
  levelName?: string;
  levelId?: number;
  experiencePoints?: number;
  nextLevelXp?: number; // TBI
  currentStreakDays?: number;
  onChangeUsername?: (newName: string) => Promise<boolean>;
  saving?: boolean;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  username,
  levelName,
  levelId,
  experiencePoints = 0,
  nextLevelXp = 1000,
  currentStreakDays = 0,
  onChangeUsername,
  saving = false,
}) => {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(username ?? "");
  const [error, setError] = useState<string | null>(null);

  const xpForNext = Math.max(1, nextLevelXp);
  const xpPercent = Math.round((Math.min(experiencePoints, xpForNext) / xpForNext) * 100);

  const submit = async () => {
    if (!onChangeUsername) return setEditing(false);
    if (!local || local.trim().length < 2) {
      setError("Nome muito curto");
      return;
    }
    setError(null);
    try {
      await onChangeUsername(local.trim());
      setEditing(false);
    } catch (err: any) {
      setError(err?.message ?? "Erro ao salvar");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="flex items-center gap-4">
        <AvatarInitials name={username ?? ""} size={88} />

        <div className="flex flex-col">
          {!editing ? (
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">{username ?? "Usuário"}</h2>

              {onChangeUsername && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditing(true)}
                >
                  Editar
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input 
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm"
                placeholder="Novo nome de usuário"
              />
              <Button
                size="sm"
                onClick={submit}
                disabled={saving}
              >
                {saving ? "Salvando" : "Salvar"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditing(false);
                  setLocal(username ?? "");
                  setError(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          )}

          {error && <div className="text-xs text-red-600 mt-1">{error}</div>}

          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium">{levelName ?? "—"}</span>
            <span>{" - "}</span> 
            <span className="font-medium">{levelId}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span>{`Streak: ${currentStreakDays} dia${currentStreakDays === 1 ? "" : "s"}`}</span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="mb-2 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">Experiência</div>
            <div className="text-sm text-gray-600">{experiencePoints} XP</div>
          </div>

          <Progress value={experiencePoints} max={xpForNext} showLabel />

          <div className="mt-2 text-xs text-gray-500">
            {experiencePoints} / {xpForNext} XP para o próximo nível
          </div>
        </div>
      </div>
    </div>
  )
};
