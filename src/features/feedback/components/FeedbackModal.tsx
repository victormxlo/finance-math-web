import { AnimatePresence, motion } from "framer-motion";
import { useFeedbackModal } from "../hooks/useFeedbackModal";
import { Button } from "@/components/ui/Button";
import { FeedbackHeader } from "./FeedbackHeader";
import type { FeedbackType } from "../types/feedbackType";
import { FeedbackReward } from "./FeedbackReward";
import type { GamificationProfileSummaryDTO } from "@/features/profile/dtos/gamificationProfileSummaryDto";
import type { RewardDTO } from "@/features/gamification/dtos/rewardDto";
import { FeedbackAchievements } from "./FeedbackAchievements";
import type { UserAchievementDTO } from "@/features/achievement/dtos/userAchievementDto";
import { FeedbackChallenges } from "./FeedbackChallenges";
import type { UserChallengeProgressDTO } from "@/features/challenge/dtos/userChallengeProgressDto";
import { FeedbackRecommendations } from "./FeedbackRecommendations";
import type { RecommendedItemDTO } from "@/features/gamification/recommendedItemDto";

export const FeedbackModal: React.FC = () => {
  const { isOpen, type, data, closeFeedback } = useFeedbackModal();
  
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh]"
        >
          <FeedbackHeader type={type as FeedbackType} />
          <FeedbackReward reward={data.reward as RewardDTO} profile={data.profile as GamificationProfileSummaryDTO} />
          <FeedbackAchievements achievements={data.achievementsUnlocked as UserAchievementDTO[]} />
          <FeedbackChallenges challenges={data.challengesProgress as UserChallengeProgressDTO[]} />
          <FeedbackRecommendations items={data.nextRecommended as RecommendedItemDTO[]} />

          <div className="mt-8 flex justify-end">
            <Button className="cursor-pointer" onClick={closeFeedback}>Continue</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};