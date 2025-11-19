import { useContents } from "../hooks/useContents";
import { CategoryList } from "../components/CategoryList";
import { SubcategoryList } from "../components/SubcategoryList";
import { ContentList } from "../components/ContentList";
import { useCategories } from "../hooks/useCategories";

export function ContentPage() {
  const {
    categories,
    subcategories,
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory,
  } = useCategories();

  const { contents } = useContents(selectedCategory, selectedSubcategory);

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold mb-4">Conteúdos</h1>
      </header>
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
  );
};
