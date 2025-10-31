import type { UserChallengeProgressDTO } from "@/features/challenge/dtos/userChallengeProgressDto";

interface FeedbackChallengesProps {
  challenges: UserChallengeProgressDTO[];
};

export const FeedbackChallenges: React.FC<FeedbackChallengesProps> = ({ challenges }) => {
  if (!challenges?.length) return null;

  return (
    <section className="mt-6">
      <h3 className="font-semibold text-lg">Desafios atualizados</h3>
      <ul className="mt-3 space-y-3">
        {challenges.map((c) => (
          <li
            key={c.challengeId}
            className="border rounded-lg p-3"
          >
            <p className="font-semibold">{c.challengeName}</p>
            <p className="text-xs text-gray-600">{c.challengeDescription}</p>
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div 
                className={`h-2 rounded ${c.isCompleted ? "bg-green-600" : "bg-primary"}`}
                style={{ width: `${(c.currentProgress / c.targetProgress) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
