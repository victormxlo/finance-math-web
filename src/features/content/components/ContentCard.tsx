import type { FC } from "react";
import type { ContentDTO } from "@/features/content/dtos/contentDto";

interface ContentCardProps {
  content: ContentDTO;
  completed?: boolean;
  onOpen?: (id: string) => void;
};

export const ContentCard: FC<ContentCardProps> = ({ content, completed = false, onOpen }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className={`text-sm font-medium ${completed ? "text-green-600" : "text-gray-500"}`}>
          {completed ? "✔ Completed" : "⏳ Not started"}
        </span>
        <button
          className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:brightness-95 transition"
          onClick={() => onOpen}
        >
          Open
        </button>
      </div>
    </div>
  );
}