import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFeedbackModal } from "@/features/feedback/hooks/useFeedbackModal";
import { useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExerciseDetail } from "@/features/exercise/hooks/useExerciseDetail"
import { FEEDBACK_TYPES } from "@/features/feedback/constants/feedbackTypes";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardTitle } from "@/components/ui/CardTitle";
import { ExerciseQuestionCard } from "../components/ExerciseQuestionCard";
import { ExerciseOptionsList } from "../components/ExerciseOptionsList";
import { ExerciseActionsFooter } from "../components/ExerciseActionsFooter";

export const ExerciseDetailPage: FC = ({}) => {
  const { id: exerciseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  const {
    exercise,
    visibleHints,
    selectedOptionId,
    setSelectedOptionId,
    validateAnswer,
    validating,
    isAnswerValidated,
    isAnswerCorrect,
    revealNextHint,
    usedHint,
    isExerciseCompleted,
    completeExercise,
    completing,
    completeResult,
    backendCompleted,
  } = useExerciseDetail(exerciseId, userId);

  const { openFeedback } = useFeedbackModal();
  
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const options = exercise?.options ?? [];
  const question = exercise?.question ?? "";
  const difficulty = exercise?.difficulty ?? undefined;

  const interactionsDisabled = Boolean(isExerciseCompleted);

  const handleConfirm = async () => {
    setValidationMessage(null);

    if (!exerciseId) return;
    if (!selectedOptionId) {
      setValidationMessage("Selecione uma opção antes de confirmar.");
      return;
    }

    if (interactionsDisabled) return;

    try {
      const validation = await validateAnswer();

      if (!validation?.isCorrect) {
        setValidationMessage("Resposta incorreta. Tente novamente.");
        return;
      }

      const result = await completeExercise();

      if (result) {
        try {
          openFeedback(FEEDBACK_TYPES.EXERCISE, result);
        } catch (error) {
          console.error(error);
        }
      } else {
        if (completeResult) {
          try {
            openFeedback(FEEDBACK_TYPES.EXERCISE, completeResult);
          } catch (error) {
            console.error(error);
          }
        } else {
          setValidationMessage("Exercício já completado.");
        }
      } 
    } catch (err) {
      console.error("Validate/Complete error", err);
      setValidationMessage("Ocorreu um erro ao validar/completar o exercício. Tente novamente.");
    }
  };

  const handleShowHint = () => {
    if (interactionsDisabled) return;
    revealNextHint();
  };

  if (!exercise) {
    return (
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Carregando exercício…</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Aguarde enquanto carregamos os dados.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <ExerciseQuestionCard question={question} difficulty={difficulty} />

      <Card>
        <CardHeader>
          <CardTitle>Alternativas</CardTitle>
        </CardHeader>
        <CardContent>
          <ExerciseOptionsList 
            options={options}
            selectedOptionId={selectedOptionId ?? undefined}
            onSelect={(optId) => {
              if (interactionsDisabled) return;

              setSelectedOptionId(optId);
              setValidationMessage(null);
            }}
            disabled={interactionsDisabled}
          />

          {visibleHints && visibleHints.length > 0 && (
            <div className="mt-4 p-3 border rounded-md bg-gray-50">
              <div className="text-xs font-semibold text-gray-700 mb-1">Dica</div>
              {visibleHints.map((hint) =>(
                <div key={hint.id} className="text-sm text-gray-700">{hint.description}</div>
              ))}
            </div>
          )}

          {validationMessage && (
            <div className="mt-4">
              <div className="text-sm text-rose-700 bg-rose-50 p-3 rounded">{validationMessage}</div>
            </div>
          )}

          <ExerciseActionsFooter
            onConfirm={handleConfirm}
            onNext={undefined}
            onShowHint={!usedHint ? handleShowHint : undefined}
            confirming={validating || completing}
            completed={Boolean(isExerciseCompleted)}
            disableConfirm={Boolean(!selectedOptionId) || interactionsDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};
