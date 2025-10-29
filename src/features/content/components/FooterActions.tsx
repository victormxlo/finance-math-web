import { Button } from "@/components/ui/Button";

interface FooterActionsProps {
  onPrev: () => void;
  onNext: () => void;
  onComplete: () => Promise<void>;
  disablePrev?: boolean;
  disableNext?: boolean;
  completing?: boolean;
}

export const FooterActions: React.FC<FooterActionsProps> = ({ onPrev, onNext, onComplete, disablePrev, disableNext, completing }) => {
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

        <Button variant="destructive" className="cursor-pointer" size="sm" onClick={() => void onComplete()} disabled={completing}>
          {completing ? "Completing..." : "Complete content"}
        </Button>
      </div>
    </div>
  );
};
