import { AchievementsHighlight } from "../components/AchievementsHighlight";
import { ActivityTimeline } from "../components/ActivityTimeline";
import { LearningPath } from "../components/LearningPath";
import { NextContents } from "../components/NextContents";
import { QuickStats } from "../components/QuickStats";
import { WelcomeBanner } from "../components/WelcomeBanner";

export function DashboardPage() {
  return (
    <div className="space-y-10">
      <WelcomeBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <QuickStats />
        </div>
      </div>

      <LearningPath />

      <NextContents limit={3} />
      <ActivityTimeline limit={4}/>
      <AchievementsHighlight limit={8} />
    </div>
  );
};
