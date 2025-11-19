import { AchievementsHighlight } from "@/features/dashboard/components/AchievementsHighlight";
import { ActivityTimeline } from "@/features/dashboard/components/ActivityTimeline";
import { ChallengeWidget } from "@/features/dashboard/components/ChallengeWidget";
import { LearningPath } from "@/features/dashboard/components/LearningPath";
import { NextContents } from "@/features/dashboard/components/NextContents";
import { QuickStats } from "@/features/dashboard/components/QuickStats";
import { WelcomeBanner } from "@/features/dashboard/components/WelcomeBanner";

export function DashboardPage() {
  return (
    <div className="space-y-10">
      <WelcomeBanner />

      <QuickStats />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <LearningPath />
          <NextContents limit={3} />
          <AchievementsHighlight limit={8} />
        </div>

        <div className="xl:col-span-1">
          <ChallengeWidget />
        </div>
      </div>

      <ActivityTimeline limit={4} />
    </div>
  );
}
