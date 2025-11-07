import type { ChallengeDTO } from "../dtos/challengeDto";
import type { UserChallengeProgressDTO } from "../dtos/userChallengeProgressDto";
import { ChallengeCard } from "./ChallengeCard";

interface Item {
  challenge: ChallengeDTO;
  progress?: UserChallengeProgressDTO | null;
};

interface ChallengeListProps {
  items: Item[];
  onAction?: (type: "content" | "exercise") => void;
};

export const ChallengeList: React.FC<ChallengeListProps> = ({ items, onAction }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">Nenhum desafio encontrado</h3>
        <p className="text-sm text-gray-600 mt-2">Volte mais tarde. Novos desafios aparecem regularmente.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(({ challenge, progress }) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          progress={progress ?? null}
          onAction={onAction}
        />
      ))}
    </div>
  );
};
