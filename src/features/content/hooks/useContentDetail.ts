import { useState, useMemo, useCallback, useEffect } from "react";
import { readLocalProgress, writeLocalProgress, type LocalContentProgress } from "../utils/localContentProgress";
import { useCompleteContent } from "./useCompleteContent";
import { useContent } from "./useContent";
import { useContentProgress } from "./useContentProgress";
import { useContentSections } from "./useContentSections";
import type { ContentSectionDTO } from "../dtos/contentSectionDto";

export function useContentDetail(contentId?: string, userId?: string) {
  const { data: content, loading: loadingContent, error: errorContent, reload: reloadContent } = useContent(contentId);
  const { data: sections, loading: loadingSections, error: errorSections, reload: reloadSections } = useContentSections(contentId);
  const { data: progressEntries, loading: loadingProgress } = useContentProgress(userId ?? undefined, contentId);
  const { complete, loading: completing, result: completeResult, error: completeError } = useCompleteContent();

  const [localProgress, setLocalProgress] = useState<LocalContentProgress>(() => {
    if (!contentId) return { completedSectionIds: [], updatedAt: new Date().toISOString() };
    return readLocalProgress(contentId) ?? { completedSectionIds: [], updatedAt: new Date().toISOString() };
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const loading = loadingContent || loadingSections || loadingProgress;
  const error = errorContent ?? errorSections ?? null;

  const orderedSections: ContentSectionDTO[] = useMemo(() => (sections ? [...sections].sort((a,b)=>a.order-b.order) : []), [sections]);

  const completedSectionIdsSet = useMemo(() => {
    const s = new Set<string>(localProgress.completedSectionIds ?? []);
    if (progressEntries && progressEntries.length > 0) {
      s.clear();
      orderedSections.forEach(sec => s.add(sec.id));
    }
    return s;
  }, [localProgress, progressEntries, orderedSections]);

  const markSectionComplete = useCallback((sectionId: string) => {
    setLocalProgress(prev => {
      const next = {
        completedSectionIds: Array.from(new Set([...(prev?.completedSectionIds ?? []), sectionId])),
        updatedAt: new Date().toISOString(),
      };
      if (contentId) writeLocalProgress(contentId, next);
      return next;
    });
  }, [contentId]);

  const markSectionIncomplete = useCallback((sectionId: string) => {
    setLocalProgress(prev => {
      const next = {
        completedSectionIds: (prev?.completedSectionIds ?? []).filter(id => id !== sectionId),
        updatedAt: new Date().toISOString(),
      };
      if (contentId) writeLocalProgress(contentId, next);
      return next;
    });
  }, [contentId]);

  const goToNext = useCallback(() => {
    setActiveIndex(prev => Math.min(prev + 1, Math.max(0, orderedSections.length - 1)));
  }, [orderedSections.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const goToSectionByIndex = useCallback((idx: number) => {
    if (idx < 0 || idx >= orderedSections.length) return;
    setActiveIndex(idx);
  }, [orderedSections.length]);

  const allSectionsCompleted = useMemo(() => {
    if (!orderedSections.length) return false;
    return orderedSections.every(sec => completedSectionIdsSet.has(sec.id));
  }, [orderedSections, completedSectionIdsSet]);

  const completeContent = useCallback(async () => {
    if (!contentId) throw new Error("Content id missing");
    const res = await complete(contentId);
    const allIds = orderedSections.map(s => s.id);
    const payload: LocalContentProgress = { completedSectionIds: allIds, updatedAt: new Date().toISOString() };
    setLocalProgress(payload);
    writeLocalProgress(contentId, payload);
    return res;
  }, [complete, contentId, orderedSections]);

  useEffect(() => {
    if (!orderedSections || orderedSections.length === 0) {
      setActiveIndex(0);
      return;
    }
    const idx = orderedSections.findIndex(s => !completedSectionIdsSet.has(s.id));
    setActiveIndex(idx === -1 ? orderedSections.length - 1 : idx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId, sections, progressEntries]);

  return {
    content,
    sections: orderedSections,
    activeIndex,
    setActiveIndex,
    loading,
    error,
    localProgress,
    completedSectionIds: new Set(localProgress.completedSectionIds),
    completedSectionIdsSet,
    markSectionComplete,
    markSectionIncomplete,
    goToNext,
    goToPrev,
    goToSectionByIndex,
    allSectionsCompleted,
    completeContent,
    completing, // boolean from useCompleteContent
    completeResult,
    reload: { reloadContent, reloadSections }
  };
}