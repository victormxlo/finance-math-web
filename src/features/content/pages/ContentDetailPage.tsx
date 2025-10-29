import { useNavigate, useParams } from "react-router-dom";
import { ContentHeader } from "../components/ContentHeader";
import { useAuth } from "@/features/auth/context/useAuth";
import { useContentDetail } from "@/features/content/hooks/useContentDetail";
import { MediaHero } from "../components/MediaHero";
import { TableOfContents } from "../components/TableOfContents";
import { SectionBlock } from "../components/SectionBlock";
import { FooterActions } from "../components/FooterActions";

export const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  const {
    content,
    sections,
    activeIndex,
    setActiveIndex,
    loading,
    error,
    markSectionComplete,
    markSectionIncomplete,
    completedSectionIdsSet,
    goToNext,
    goToPrev,
    allSectionsCompleted,
    completeContent,
    completing,
    completeResult,
  } = useContentDetail(id, userId);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-64 bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded" />
        </div>
      </div>
    );
  };

  if (error || !content) {
    // TBI: Create a better UX for this feature
    return (
      <div className="p-6">
        <div className="text-red-600">Failed to load content. {error}</div>
        <button className="mt-4" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-8">
        <aside className="hidden lg:block sticky top-20 self-start">
          <TableOfContents 
          sections={sections} 
          activeIndex={activeIndex} 
          onNavigate={(idx) => setActiveIndex(idx)}
          completedIds={completedSectionIdsSet}
          />
        </aside>

        <main className="w-full">
          <ContentHeader 
            title={content.title}
            categoryId={content.categoryId}
            createdAt={content.createdAt}
            sectionsCount={sections.length}
            onComplete={async () => {
              try {
                await completeContent();
                // TBI: Create completion UX
              } catch {}
            }}
            completing={completing}
            allCompleted={allSectionsCompleted}
          />

          {content.mediaUrl && <MediaHero mediaUrl={content.mediaUrl} />}

          <div className="mt-6 space-y-6">
            {sections.map((section, idx) => (
              <SectionBlock
                key={section.id}
                section={section}
                isActive={idx === activeIndex}
                onMarkComplete={() =>
                  completedSectionIdsSet.has(section.id)
                    ? markSectionIncomplete(section.id)
                    : markSectionComplete(section.id)
                }
                completed={completedSectionIdsSet.has(section.id)}
                onNavigateNext={() => {
                  setActiveIndex(Math.min(idx + 1, sections.length - 1));
                }}
              />
            ))}
          </div>

          <FooterActions
            onPrev={() => goToPrev()}
            onNext={() => goToNext()}
            onComplete={async () => {
              try {
                await completeContent();
                // TBI: Reward modal
              } catch {}
            }}
            disablePrev={activeIndex === 0}
            disableNext={activeIndex === sections.length - 1}
            completing={completing}
          />
        </main>

        <aside className="hidden lg:block sticky top-20 self-start">
          <div className="border rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600">Sections</div>
            <div className="mt-2 text-lg font-medium">{sections.length}</div>

            <div className="mt-4">
              <div className="text-sm text-gray-600">Progress</div>
              <div className="mt-1">
                <div className="w-full bg-gray-200 rounded h-2">
                  <div
                    className="bg-green-600 h-2 rounded"
                    style={{
                      width: `${sections.length ? (Array.from(completedSectionIdsSet).length / sections.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="text-xs mt-2 text-gray-600">
                  {Array.from(completedSectionIdsSet).length} of {sections.length} sections
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <div className="font-medium mb-2">Quick actions</div>
              <div className="flex flex-col gap-2">
                <button className="px-3 py-2 border rounded" onClick={() => window.print()}>Print</button>
                <button className="px-3 py-2 border rounded" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Top</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
