import type { CategoryDTO } from "../dtos/categoryDto";

interface SubcategoryListProps {
  categories: CategoryDTO[];
  onSelect: (id: string) => void;
  onBack?: () => void;
}

export const SubcategoryList = ({ categories, onSelect, onBack }: SubcategoryListProps) => {
  return (
    <div className="space-y-4">
      {onBack && (
        <button
          onClick={onBack}
          className="px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          ← Back to Categories
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => onSelect(subcategory.id)}
            className="rounded-2xl shadow-md p-6 bg-white hover:shadow-lg transition-all text-left"
          >
            <h3 className="text-lg font-semibold mb-1">{subcategory.name}</h3>
            <p className="text-sm text-gray-500">
              {subcategory.contentIds.length} contents
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
