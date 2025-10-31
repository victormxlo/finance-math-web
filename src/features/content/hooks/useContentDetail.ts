import { useState, useMemo, useCallback, useEffect } from "react";
import { readLocalProgress, writeLocalProgress, type LocalContentProgress } from "../utils/localContentProgress";
import { useCompleteContent } from "./useCompleteContent";
import { useContent } from "./useContent";
import { useContentProgress } from "./useContentProgress";
import { useContentSections } from "./useContentSections";
import type { ContentSectionDTO } from "../dtos/contentSectionDto";
import type { CompleteContentResponseDTO } from "../dtos/completeContentResponseDto";
import type { UserContentProgressDTO } from "../dtos/userContentProgressDto";

export function useContentDetail(contentId?: string, userId?: string) {
  const { data: content, loading: loadingContent, error: errorContent, reload: reloadContent } = useContent(contentId);
  const { data: sections, loading: loadingSections, error: errorSections, reload: reloadSections } = useContentSections(contentId);
  const { data: progressEntries, loading: loadingProgress, reload: reloadProgress } = useContentProgress(userId ?? undefined, contentId);
  const { complete, loading: completing, result: completeResult, error: completeError } = useCompleteContent();

  const [localProgress, setLocalProgress] = useState<LocalContentProgress>(() => {
    if (!contentId) return { completedSectionIds: [], updatedAt: new Date().toISOString() };
    return readLocalProgress(contentId) ?? { completedSectionIds: [], updatedAt: new Date().toISOString() };
  });

  const [optimisticCompleted, setOptimisticCompleted] = useState<boolean>(false);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const loading = loadingContent || loadingSections || loadingProgress;
  const error = errorContent ?? errorSections ?? null;

  const orderedSections: ContentSectionDTO[] = useMemo(() => (sections ? [...sections].sort((a, b) => a.order - b.order) : []), [sections]);

  const backendCompleted = useMemo(() => {
    if (!progressEntries || !progressEntries.length || !userId || !contentId) return false;
    const entry = (progressEntries as UserContentProgressDTO[]).find((p) => p.userId === userId && p.contentId === contentId);
    return !!(entry && entry.completedAt);
  }, [progressEntries, userId, contentId]);

  const isContentCompleted = useMemo(() => {
    return optimisticCompleted || backendCompleted;
  }, [optimisticCompleted, backendCompleted]);

  useEffect(() => {
    if (backendCompleted) setOptimisticCompleted(true);
  }, [backendCompleted]);

  useEffect(() => {
    setOptimisticCompleted(false);
  }, [contentId]);

  const completedSectionIdsSet = useMemo(() => {
    const set = new Set<string>(localProgress?.completedSectionIds ?? []);
    if (isContentCompleted && orderedSections.length) {
      set.clear();
      orderedSections.forEach((s) => set.add(s.id));
    }
    return set;
  }, [localProgress, isContentCompleted, orderedSections]);

  const markSectionComplete = useCallback((sectionId: string) => {
    setLocalProgress((prev) => {
      const prevIds = prev?.completedSectionIds ?? [];
      const nextIds = Array.from(new Set([...prevIds, sectionId]));
      const next: LocalContentProgress = { completedSectionIds: nextIds, updatedAt: new Date().toISOString() };
      if (contentId) writeLocalProgress(contentId, next);
      return next;
    });
  }, [contentId]);

  const markSectionIncomplete = useCallback((sectionId: string) => {
    if (isContentCompleted) return;
    setLocalProgress((prev) => {
      const prevIds = prev?.completedSectionIds ?? [];
      const nextIds = prevIds.filter((id) => id !== sectionId);
      const next: LocalContentProgress = { completedSectionIds: nextIds, updatedAt: new Date().toISOString() };
      if (contentId) writeLocalProgress(contentId, next);
      return next;
    });
  }, [contentId, isContentCompleted]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, Math.max(0, orderedSections.length - 1)));
  }, [orderedSections.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSectionByIndex = useCallback((idx: number) => {
    if (idx < 0 || idx >= orderedSections.length) return;
    setActiveIndex(idx);
  }, [orderedSections.length]);

  const allSectionsCompleted = useMemo(() => {
    if (!orderedSections.length) return false;
    return orderedSections.every((s) => completedSectionIdsSet.has(s.id));
  }, [orderedSections, completedSectionIdsSet]);

  const completeContent = useCallback(async (): Promise<CompleteContentResponseDTO | null> => {
    if (!contentId) throw new Error("Content id missing");
    if (isContentCompleted) return null;

    try {
      const res = await complete(contentId);
      if (res) {
        const allIds = orderedSections.map((s) => s.id);
        const payload: LocalContentProgress = { completedSectionIds: allIds, updatedAt: new Date().toISOString() };
        setLocalProgress(payload);
        if (contentId) writeLocalProgress(contentId, payload);

        setOptimisticCompleted(true);
      }
      return res ?? null;
    } catch (err) {
      throw err;
    }
  }, [complete, contentId, orderedSections, isContentCompleted]);

  useEffect(() => {
    if (!orderedSections || orderedSections.length === 0) {
      setActiveIndex(0);
      return;
    }
    const firstNotCompletedIdx = orderedSections.findIndex((s) => !completedSectionIdsSet.has(s.id));
    setActiveIndex(firstNotCompletedIdx === -1 ? Math.max(0, orderedSections.length - 1) : firstNotCompletedIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId, sections, progressEntries, isContentCompleted]);

  return {
    content,
    sections: orderedSections,
    activeIndex,
    setActiveIndex,
    loading,
    error,
    contentProgress: progressEntries,
    localProgress,
    completedSectionIds: new Set(localProgress?.completedSectionIds ?? []),
    completedSectionIdsSet,
    markSectionComplete,
    markSectionIncomplete,
    goToNext,
    goToPrev,
    goToSectionByIndex,
    allSectionsCompleted,
    completeContent,
    completing,
    completeResult,
    completeError,
    isContentCompleted,
    reload: { reloadContent, reloadSections, reloadProgress },
  };
}