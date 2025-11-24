import type { RewardDTO } from "@/features/gamification/dtos/rewardDto";
import type { GamificationProfileSummaryDTO } from "@/features/profile/dtos/gamificationProfileSummaryDto";

interface FeedbackRewardProps {
  reward: RewardDTO;
  profile: GamificationProfileSummaryDTO;
};

export const FeedbackReward: React.FC<FeedbackRewardProps> = ({ reward, profile }) => (
  <section className="bg-primary/5 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between">
    <div>
      <p className="font-semibold text-primary text-lg">+{reward.xpAwarded} Capital</p>
      <p className="font-semibold text-yellow-600 text-lg">+{reward.virtualCurrencyAwarded} Dividendos</p>
    </div>
    <div className="text-right text-sm text-gray-600">
      <p>Nível atual: <span className="font-semibold text-gray-800">{profile.levelId} | {profile.levelName}</span></p>
      <p>Streak: <span className="font-semibold text-gray-800">{profile.currentStreakDays} dias</span></p>
    </div>
  </section>
);
