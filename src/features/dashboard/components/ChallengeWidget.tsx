import { Button } from "@/components/ui/Button";
import { Trophy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ChallengeItem } from "./ChallengeItem";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useChallengeWidget } from "../hooks/useChallengeWidget";

export function ChallengeWidget() {
  const { user } = useAuth();
  const { challenges } = useChallengeWidget(user?.id);
  const isEmpty = challenges.length === 0;

  const navigate = useNavigate();

  return (
    <section className="bg-background border border-border rounded-2xl p-6 shadow-sm space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">
            Desafios ativos
          </h2>
        </div>
        {!isEmpty && <Button className="p-0 h-auto" size="sm" variant="link" onClick={() => navigate("/challenges")} >
          Ver todos
        </Button>}
      </header>

      {isEmpty && (
        <p className="text-sm text-muted-foreground">
          Nenhum desafio ativo no momento. Confira os <Link to="/challenges" className="text-sm text-primary hover:underline">desafios disponíveis</Link>.
        </p>
      )}

      <div className="space-y-4">
        {challenges.map((c) => (
          <ChallengeItem key={c.challengeId} challengeProgress={c} />
        ))}
      </div>
    </section>
  );
};
