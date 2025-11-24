import type { ContentSectionDTO } from "../dtos/contentSectionDto";

interface TableOfContentsProps {
  sections: ContentSectionDTO[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  completedIds?: Set<string>;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, activeIndex, onNavigate, completedIds = new Set() }) => {
  return (
    <nav aria-label="Table of Contents" className="w-72">
      <div className="text-sm font-semibold mb-3">Conteúdos</div>

      <ul className="space-y-2">
        {sections.map((s, idx) => {
          const isActive = activeIndex === idx;
          const completed = completedIds.has(s.id);
          return (
            <li key={s.id}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${isActive ? "bg-primary/10" : "hover:bg-gray-50"} cursor-pointer`}
                onClick={() => onNavigate(idx)}
              >
                <div>
                  <div className={`text-sm font-medium ${isActive ? "text-primary" : ""}`}>{s.title}</div>
                  <div className="text-xs text-gray-500">Seção {s.order + 1}</div>
                </div>

                <div className="ml-2">
                  {completed ? (
                    <span className="text-green-600 text-sm">✔</span>
                  ) : (
                    <span className="text-gray-300 text-sm">•</span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}