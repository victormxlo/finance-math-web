import { Button } from "@/components/ui/Button";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockChallenges } from "../mocks/mockChallenges";
import { ChallengeItem } from "./ChallengeItem";

export function ChallengeWidget() {
  const navigate = useNavigate();

  return (
    <section className="bg-background border border-border rounded-2xl p-6 shadow-sm space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">
            Active Challenges
          </h2>
        </div>
        <Button className="p-0 h-auto" size="sm" variant="link" onClick={() => navigate("/challenges")} >
          View All
        </Button>
      </header>

      <div className="space-y-4">
        {mockChallenges.map((c) => (
          <ChallengeItem key={c.id} challenge={c} />
        ))}
      </div>
    </section>
  );
};
