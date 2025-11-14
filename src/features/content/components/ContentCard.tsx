import type { FC } from "react";
import type { ContentDTO } from "@/features/content/dtos/contentDto";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  content: ContentDTO;
  completed?: boolean;
};

export const ContentCard: FC<ContentCardProps> = ({ content, completed = false }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className={`text-sm font-medium ${completed ? "text-green-600" : "text-gray-500"}`}>
          {completed ? "✔ Concluído" : "⏳ Não iniciado"}
        </span>
        <button
          className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:brightness-95 transition cursor-pointer"
          onClick={() => navigate(`/contents/${content.id}`)}
        >
          Abrir
        </button>
      </div>
    </div>
  );
}