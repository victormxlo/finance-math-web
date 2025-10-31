import { FEEDBACK_TYPES } from "../constants/feedbackTypes";
import type { FeedbackType } from "../types/feedbackType";

interface FeedbackHeaderProps {
  type: FeedbackType
};

export const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({ type }) => {
  const title =
    type === FEEDBACK_TYPES.CONTENT
      ? "Parabéns! Você concluiu um novo módulo com sucesso."
      : "Excelente! Você completou o exercício com perfeição.";
  
  const subtitle =
    type === FEEDBACK_TYPES.CONTENT
      ? "Agora, você está mais preparado para avançar em sua jornada financeira. Continue assim e conquiste novas recompensas!"
      : "Você demonstrou grande habilidade. Veja o resumo do seu desempenho e prepare-se para o próximo desafio!"

  return (
    <header className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <p className="text-gray-600 mt-2">{subtitle}</p>
    </header>
  );
};