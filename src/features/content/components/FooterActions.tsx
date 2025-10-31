import { Button } from "@/components/ui/Button";

interface FooterActionsProps {
  onPrev: () => void;
  onNext: () => void;
  onComplete: () => Promise<void>;
  disablePrev?: boolean;
  disableNext?: boolean;
  completing?: boolean;
  allCompleted?: boolean;
  isContentCompleted?: boolean;
}

export const FooterActions: React.FC<FooterActionsProps> = ({ onPrev, onNext, onComplete, disablePrev, disableNext, completing, allCompleted, isContentCompleted }) => {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      <div>
        <Button variant="outline" size="sm" onClick={onPrev} disabled={disablePrev}>
          ← Previous
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Top</Button>
        <Button variant="default" size="sm" className="cursor-pointer" onClick={onNext} disabled={disableNext}>Next →</Button>

        <Button
          variant={isContentCompleted ? "secondary" : "default"}
          disabled={isContentCompleted || completing || !allCompleted}
          onClick={onComplete}
          className="w-full cursor-pointer"
        >
          {isContentCompleted ? "Conteúdo concluído" : completing ? "Concluindo..." : "Concluir"}
        </Button>
      </div>
    </div>
  );
};
