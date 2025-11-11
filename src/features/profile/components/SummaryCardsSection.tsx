import { Card } from "@/components/ui/Card";
import { Coins, Flame, TrendingUp } from "lucide-react";

interface SummaryCardsSectionProps {
  levelName: string;
  experiencePoints: number;
  virtualCurrency: number;
  currentStreakDays: number;
};

export function SummaryCardsSection({
  levelName,
  experiencePoints,
  virtualCurrency,
  currentStreakDays,
}: SummaryCardsSectionProps) {
  const cards = [
    {
      label: "Level & XP",
      value: `${levelName}`,
      subValue: `${experiencePoints} XP`,
      icon: TrendingUp,
    },
    {
      label: "Virtual Currency",
      value: `${virtualCurrency}`,
      subValue: "Coins",
      icon: Coins,
    },
    {
      label: "Current Streak",
      value: `${currentStreakDays} days`,
      subValue: "Daily Activity",
      icon: Flame,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {cards.map((card) => (
        <Card
          key={card.label}
          className="p-4 flex items-center justify-between rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <div>
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="text-xl font-semibold">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.subValue}</p>
          </div>
          <card.icon className="w-8 h-8 text-muted-foreground" />
        </Card>
      ))}
    </div>
  );
};
