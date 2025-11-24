import { useContents } from "../hooks/useContents";
import { CategoryList } from "../components/CategoryList";
import { SubcategoryList } from "../components/SubcategoryList";
import { ContentList } from "../components/ContentList";
import { useCategories } from "../hooks/useCategories";
import { useContentProgress } from "../hooks/useContentProgress";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function ContentPage() {
  const { user } = useAuth();

  const {
    categories,
    subcategories,
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory,
  } = useCategories();

  const { contents } = useContents(selectedCategory, selectedSubcategory);
  const { data: completedContents } = useContentProgress(user?.id);

  const completedContentsIds = completedContents.map(c => c.contentId);

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const handleBackToSubcategories = () => {
    setSelectedSubcategory(null);
  };

  const hasSubcategories =
    selectedCategory && subcategories && subcategories.length > 0;

  return (
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold mb-4">Conteúdos</h1>
      </header>

      {!selectedCategory && (
        <CategoryList
          categories={categories}
          onSelect={setSelectedCategory}
        />
      )}

      {selectedCategory && hasSubcategories && !selectedSubcategory && (
        <SubcategoryList
          categories={subcategories}
          onBack={handleBackToCategories}
          onSelect={setSelectedSubcategory}
        />
      )}

      {selectedCategory && !hasSubcategories && (
        <ContentList
          contents={contents}
          onBack={handleBackToCategories}
        />
      )}

      {selectedSubcategory && (
        <ContentList
          contents={contents}
          completedIds={completedContentsIds}
          onBack={handleBackToSubcategories}
        />
      )}
    </div>
  );
}