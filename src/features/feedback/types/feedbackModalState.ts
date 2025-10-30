import type { CompleteContentResponseDTO } from "@/features/content/dtos/completeContentResponseDto";
import type { FeedbackType } from "./feedbackType";
import type { CompleteExerciseResponseDTO } from "@/features/exercise/dtos/completeExerciseResponseDto";

export interface FeedbackModalState {
  isOpen: boolean;
  type?: FeedbackType;
  data?: CompleteContentResponseDTO | CompleteExerciseResponseDTO;
  openFeedback: (type: FeedbackType, data: CompleteContentResponseDTO | CompleteExerciseResponseDTO) => void;
  closeFeedback: () => void;
};
