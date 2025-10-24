import { AchievementsHighlight } from "../components/AchievementsHighlight";
import { ActivityTimeline } from "../components/ActivityTimeline";
import { ChallengeWidget } from "../components/ChallengeWidget";
import { LearningPath } from "../components/LearningPath";
import { NextContents } from "../components/NextContents";
import { QuickStats } from "../components/QuickStats";
import { WelcomeBanner } from "../components/WelcomeBanner";
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
