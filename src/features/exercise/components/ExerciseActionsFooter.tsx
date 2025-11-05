import { Button } from "@/components/ui/Button";
import type { FC } from "react";

interface ExerciseActionsFooterProps {
  onConfirm: () => void;
  onNext?: () => void;
  onShowHint?: () => void;
  confirming?: boolean;
  completed?: boolean;
  disableConfirm?: boolean;
};

export const ExerciseActionsFooter: FC<ExerciseActionsFooterProps> = ({
  onConfirm,
  onNext,
  onShowHint,
  confirming = false,
  completed = false,
  disableConfirm = false,
}) => {
  return (
    <footer className="mt-8 flex justify-between items-center border-t pt-4">
      <div className="text-xs text-gray-500">
        {onShowHint ? (
          <button
            className="underline cursor-pointer disabled:opacity-50"
            onClick={onShowHint}
          >
            Mostrar dica
          </button>
        ) : (
          <span>Dica usada</span>
        )}
      </div>

      <div className="flex gap-3">
        {completed ? (
          <Button variant="secondary" disabled>
            Exercício concluído
          </Button>
        ) : (
          <>
            <Button
              onClick={onConfirm}
              className="min-w-[140px] cursor-pointer"
              disabled={disableConfirm || confirming}
            >
              {confirming ? "Confirmando..." : "Confirmar resposta"}
            </Button>
            {onNext && (
              <Button
                variant="ghost"
                onClick={onNext}
                className="text-gray-600 hover:text-gray-800"
              >
                Próxima
              </Button>
            )}
          </>
        )}
      </div>
    </footer>
  )
};
