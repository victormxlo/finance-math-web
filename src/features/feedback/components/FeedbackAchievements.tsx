import type { UserAchievementUnlockedDTO } from "@/features/achievement/dtos/userAchievementUnlockedDto";

interface FeedbackAchievementsProps {
  achievements: UserAchievementUnlockedDTO[];
};

export const FeedbackAchievements: React.FC<FeedbackAchievementsProps> = ({ achievements }) => {
  if (!achievements?.length) return null;

  return (
    <section className="mt-6">
      <h3 className="font-semibold text-lg">Conquistas desbloqueadas</h3>
      <ul className="mt-3 grid sm:grid-cols-2 gap-3">
        {achievements.map((a) => (
          <li
            key={a.id}
            className="border rounded-lg p-3 bg-green-50"
          >
            <p className="font-semibold text-green-700">{a.name}</p>
            {a?.description && <p className="text-sm text-gray-600">{a.description}</p>}
            <p className="text-xs text-gray-500 mt-1">
              +{a.experienceReward} Capital • +{a.virtualCurrencyReward} Dividendos
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
