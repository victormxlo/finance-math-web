import { QuickStats } from "../components/QuickStats";
import { WelcomeBanner } from "../components/WelcomeBanner";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <QuickStats />
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4 min-h-[150px] flex items-center justify-center text-muted-foreground">
        Next Contents
      </div>
      <div className="bg-muted rounded-lg p-4 min-h-[150px] flex items-center justify-center text-muted-foreground">
        Activity Timeline
      </div>
      <div className="bg-muted rounded-lg p-4 min-h-[150px] flex items-center justify-center text-muted-foreground">
        Achievements
      </div>
    </div>
  );
};
