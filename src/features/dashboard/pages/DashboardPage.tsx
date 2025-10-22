import { AchievementsHighlight } from "../components/AchievementsHighlight";
import { ActivityTimeline } from "../components/ActivityTimeline";
import { NextContents } from "../components/NextContents";
import { QuickStats } from "../components/QuickStats";
import { WelcomeBanner } from "../components/WelcomeBanner";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />

      <div className="grid grid-cols-1">
        <div>
          <QuickStats />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <main className="lg:col-span-2 space-y-6">
          <NextContents limit={3} />
        </main>

        <aside className="lg:col-span-1 space-y-6">
          <AchievementsHighlight limit={6} />
          <ActivityTimeline />
        </aside>
      </div>
    </div>
  );
};
