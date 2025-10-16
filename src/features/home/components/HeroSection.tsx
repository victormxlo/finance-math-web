import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { AUTH_MODES, type AuthMode } from "@/features/auth/constants/authMode";

export function HeroSection() {
  const navigate = useNavigate();

  const goToAuth = (mode: AuthMode) =>
    navigate(`/auth?mode=${mode}`);

  return (
    <section className="flex flex-col items-center text-center py-24 bg-gradient-to-b from-background to-muted">
      <h1 className="text-5xl font-bold mb-4 max-w-2xl">
        Bem-vindo ao Numera: Sua Jornada Financeira Começa Aqui
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-xl">
        Domine conceitos financeiros com exercícios interativos, conquistas e estatísticas personalizadas.
      </p>
      <div className="flex gap-4">
        <Button size="lg" onClick={() => goToAuth(AUTH_MODES.REGISTER)}>
          Começar Agora
        </Button>
        <Button size="lg" variant="outline" onClick={() => goToAuth(AUTH_MODES.LOGIN)}>
          Entrar
        </Button>
      </div>
    </section>
  )
};
