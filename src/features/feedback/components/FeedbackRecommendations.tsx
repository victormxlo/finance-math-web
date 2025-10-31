import type { RecommendedItemDTO } from "@/features/gamification/recommendedItemDto";

interface FeedbackRecommendationsProps {
  items: RecommendedItemDTO[];
}

export const FeedbackRecommendations: React.FC<FeedbackRecommendationsProps> = ({ items }) => {
  if (!items?.length) return null;

  return (
    <section className="mt-6">
      <h3 className="font-semibold text-lg">Recomendações para você</h3>
      <ul className="mt-3 grid sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <li key={item.id} className="border rounded-lg p-3 hover:bg-accent cursor-pointer transition">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="text-xs text-gray-500 mt-1">
              Tipo: {item.type} • Dificuldade: {item.difficulty}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};