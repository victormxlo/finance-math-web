import type { CompleteExerciseResponseDTO } from "../dtos/completeExerciseResponseDto";
import type { ExerciseDTO } from "../dtos/exerciseDto";
import type { ExerciseHintDTO } from "../dtos/exerciseHintDto";
import type { UserExerciseProgressDTO } from "../dtos/userExerciseProgressDto";
import type { ValidateExerciseAnswerDTO } from "../dtos/validateExerciseAnswerDto";

export const mockExercises: ExerciseDTO[] = [
  {
    id: "426002e2-2dc3-437f-aa85-5068feefda48",
    question: "O montante (M) em juros simples é formado por:",
    difficulty: "easy",
    options: [
      { id: "f92a10e0-1fa0-4fef-ab43-26235c3ceac6", description: "Apenas os juros", order: 0 },
      { id: "b4dcd152-2669-4489-a737-fb850cb8d1b7", description: "Capital + juros", order: 1 },
      { id: "9935da41-0bf4-46ba-8b6e-c24087b46e65", description: "Apenas o capital", order: 2 },
    ],
    contentIds: ["aab50e04-d3fe-40fa-a95f-b36a00e7b9b5"],
  },
  {
    id: "25f6c78e-5111-4088-962e-09b9e828dc8b",
    question: "What was the monthly interest rate on a capital of R$ 800 that earned R$ 96 in simple interest after 12 months?",
    difficulty: "easy",
    options: [
      { id: "eb91d4bf-832f-43b9-8dae-5fbc8c7f2f21", description: "1%", order: 0 },
      { id: "26473401-a233-479b-8652-81c33906b03e", description: "2%", order: 1 },
      { id: "1ba7e736-12dd-4ab6-9428-f77841b481e6", description: "3%", order: 2 },
    ],
    contentIds: ["aab50e04-d3fe-40fa-a95f-b36a00e7b9b5"],
  },
];

export const mockHints: ExerciseHintDTO[] = [
  { id: "h1", exerciseId: "426002e2-2dc3-437f-aa85-5068feefda48", description: "Lembre-se: montante = capital + juros", order: 0 },
  { id: "h2", exerciseId: "426002e2-2dc3-437f-aa85-5068feefda48", description: "Juros simples não acumulam", order: 1 },
];

export const mockValidateResponses: Record<string, ValidateExerciseAnswerDTO> = {
  // key: `${exerciseId}:${optionId}` -> result
  ["426002e2-2dc3-437f-aa85-5068feefda48:f92a10e0-1fa0-4fef-ab43-26235c3ceac6"]: {
    exerciseId: "426002e2-2dc3-437f-aa85-5068feefda48",
    exerciseOptionId: "f92a10e0-1fa0-4fef-ab43-26235c3ceac6",
    isCorrect: false,
  },
  ["426002e2-2dc3-437f-aa85-5068feefda48:b4dcd152-2669-4489-a737-fb850cb8d1b7"]: {
    exerciseId: "426002e2-2dc3-437f-aa85-5068feefda48",
    exerciseOptionId: "b4dcd152-2669-4489-a737-fb850cb8d1b7",
    isCorrect: true,
  },
};
 
export const mockCompleteResponse: CompleteExerciseResponseDTO = {
  exerciseId: "426002e2-2dc3-437f-aa85-5068feefda48",
  isCorrect: true,
  usedHint: false,
  explanation: "Montante = capital + juros. Portanto a opção correta é Capital + juros.",
  alreadyCompleted: false,
  reward: { xpAwarded: 20, virtualCurrencyAwarded: 5 },
  profile: { userId: "user-1", experiencePoints: 200, virtualCurrency: 50, levelId: 2, levelName: "Novice", currentStreakDays: 3, lastActivityDate: new Date().toISOString() },
  completedAtUtc: new Date().toISOString(),
  achievementsUnlocked: [],
  challengesProgress: [],
  nextRecommended: [{ id: "next-1", title: "Juros Compostos", type: "content", difficulty: "medium", category: "Juros" }],
};

export const mockProgress: UserExerciseProgressDTO[] = [
  {
    profileId: "pf-1",
    userId: "user-1",
    exerciseId: "25f6c78e-5111-4088-962e-09b9e828dc8b",
    exerciseQuestion: "What was the monthly interest rate ...",
    categoryId: null,
  },
];