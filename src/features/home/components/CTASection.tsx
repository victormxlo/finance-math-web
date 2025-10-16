import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { AUTH_MODES } from "@/features/auth/constants/authMode";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-primary text-primary-foreground text-center">
      <h2 className="text-3xl font-bold mb-4">
        Pronto para transformar sua educação financeira?
      </h2>
      <Button size="lg" variant="secondary" onClick={() => navigate(AUTH_MODES.REGISTER)}>
        Criar minha conta
      </Button>
    </section>
  )
};
