import { createContext, useState } from "react";
import type { FeedbackModalState } from "../types/feedbackModalState";
import type { FeedbackType } from "../types/feedbackType";
import type { CompleteContentResponseDTO } from "@/features/content/dtos/completeContentResponseDto";
import type { CompleteExerciseResponseDTO } from "@/features/exercise/dtos/completeExerciseResponseDto";

interface FeedbackModalProps {
  children: React.ReactNode;
};

export const FeedbackModalContext = createContext<FeedbackModalState | undefined>(undefined);

export const FeedbackModalProvider: React.FC<FeedbackModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<FeedbackType | undefined>(undefined);
  const [data, setData] = useState<CompleteContentResponseDTO | CompleteExerciseResponseDTO | undefined>(undefined);

  const openFeedback = (newType: FeedbackType, payload: any) => {
    setType(newType);
    setData(payload);
    setIsOpen(true);
  };

  const closeFeedback = () => setIsOpen(false);

  return (
    <FeedbackModalContext.Provider value={{ isOpen, type, data, openFeedback, closeFeedback }}>
      {children}
    </FeedbackModalContext.Provider>
  )
}