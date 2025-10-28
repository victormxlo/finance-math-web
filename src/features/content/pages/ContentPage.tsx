import { useContents } from "../hooks/useContents";
import { CategoryList } from "../components/CategoryList";
import { SubcategoryList } from "../components/SubcategoryList";
import { ContentList } from "../components/ContentList";

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
        <ContentList 
          contents={contents}
          onBack={() => setSelectedSubcategory(null)}
        />
      )}
    </div>
  )
};
