import { useContents } from "../hooks/useContents";
import { CategoryList } from "../components/CategoryList";
import { SubcategoryList } from "../components/SubcategoryList";

export function ContentPage() {
  const {
    categories,
    subcategories,
    contents,
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory
  } = useContents();
  
  return (
    <div className="p-6 space-y-8">
      {!selectedCategory && (
        <CategoryList categories={categories} onSelect={setSelectedCategory} />
      )}

      {selectedCategory && !selectedSubcategory && (
        <SubcategoryList
          categories={subcategories}
          onBack={() => setSelectedCategory(null)}
          onSelect={setSelectedSubcategory}
        />
      )}

      {selectedSubcategory && (
        <div>ContentList</div>
      )}
    </div>
  )
};
