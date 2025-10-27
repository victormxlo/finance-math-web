import type { CategoryDTO } from "../dtos/categoryDto";

interface CategoryListProps {
  categories: CategoryDTO[];
  onSelect: (id: string) => void;
};

export const CategoryList = ({ categories, onSelect }: CategoryListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className="rounded-2xl shadow-md p-6 bg-white hover:shadow-lg transition-all text-left"
        >
          <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
          <p className="text-sm text-gray-500">Explore</p>
        </button>
      ))}
    </div>
  )
}