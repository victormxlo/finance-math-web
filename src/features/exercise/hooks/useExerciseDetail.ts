import { useState, useMemo, useEffect, useCallback } from "react";
import type { CompleteExerciseResponseDTO } from "../dtos/completeExerciseResponseDto";
import type { UserExerciseProgressDTO } from "../dtos/userExerciseProgressDto";
import type { ValidateExerciseAnswerDTO } from "../dtos/validateExerciseAnswerDto";
import { useCompleteExercise } from "./useCompleteExercise";
import { useExercise } from "./useExercise";
import { useExerciseHints } from "./useExerciseHint";
import { useExerciseProgress } from "./useExerciseProgress";
import { useValidateExerciseAnswer } from "./useValidateExerciseAnswer";

export function useExerciseDetail(exerciseId?: string, userId?: string) {
  const { data: exercise, loading: loadingExercise } = useExercise(exerciseId);
  const { hints, visibleHints, visibleCount, showNext, loading: loadingHints } = useExerciseHints(exerciseId);
  const { validate, loading: validating } = useValidateExerciseAnswer();
  const { complete, loading: completing, result: completeResult } = useCompleteExercise();
  const { data: progressEntries, loading: loadingProgress } = useExerciseProgress(userId);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerValidated, setIsAnswerValidated] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [usedHint, setUsedHint] = useState(false);

  const [optimisticCompleted, setOptimisticCompleted] = useState(false);

  const loading = loadingExercise || loadingHints || validating || completing || loadingProgress;

  const backendCompleted = useMemo(() => {
    if (!progressEntries || !exerciseId || !userId) return false;
    return (progressEntries as UserExerciseProgressDTO[]).some((p) => p.exerciseId === exerciseId);
  }, [progressEntries, exerciseId, userId]);

  const isExerciseCompleted = useMemo(() => optimisticCompleted || backendCompleted, [optimisticCompleted, backendCompleted]);

  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswerValidated(false);
    setIsAnswerCorrect(null);
    setUsedHint(false);
    setOptimisticCompleted(false);
  }, [exerciseId]);

  const revealNextHint = useCallback(() => {
    if (!hints || (visibleCount ?? 0) >= (hints?.length ?? 0)) return;
    showNext();
    setUsedHint(true);
  }, [hints, showNext, visibleCount]);

  const validateAnswer = useCallback(async (): Promise<ValidateExerciseAnswerDTO> => {
    if (!exerciseId || !selectedOptionId) throw new Error("Missing exerciseId or optionId");
    setIsAnswerValidated(false);
    setIsAnswerCorrect(null);

    try {
      const res = await validate(exerciseId, selectedOptionId, userId!);
      setIsAnswerValidated(true);
      setIsAnswerCorrect(res.isCorrect);
      return res;
    } catch (err) {
      setIsAnswerValidated(true);
      setIsAnswerCorrect(false);
      throw err;
    }
  }, [exerciseId, selectedOptionId, validate]);

  const completeExercise = useCallback(async (): Promise<CompleteExerciseResponseDTO | null> => {
    if (!exerciseId) throw new Error("Missing exerciseId");
    if (isExerciseCompleted) return null;

    try {
      const res = await complete(exerciseId, selectedOptionId ?? "", usedHint, userId);
      if (res) {
        setOptimisticCompleted(true);
      }
      return res;
    } catch (err) {
      throw err;
    }
  }, [complete, exerciseId, selectedOptionId, usedHint, userId, isExerciseCompleted]);

  return {
    exercise,
    hints,
    visibleHints,
    visibleCount,
    loading,
    isAnswerValidated,
    isAnswerCorrect,
    selectedOptionId,
    setSelectedOptionId,
    validateAnswer,
    validating,
    revealNextHint,
    usedHint,
    isExerciseCompleted,
    completeExercise,
    completing,
    completeResult,
    backendCompleted,
    progressEntries,
  };
};
