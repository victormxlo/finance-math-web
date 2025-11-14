import { useAuth } from "@/features/auth/hooks/useAuth";
import type { FC } from "react";
import { useActivityTimeline } from "@/features/dashboard/hooks/useActivityTimeline";
import { AnimatePresence, motion } from "framer-motion";
import { ActivityTypeIcon } from "@/features/dashboard/components/ActivityTypeIcon";
import { formatDate } from "@/shared/utils/formatDate";

export const ActivityTimeline: FC<{ limit?: number }> = ({ limit = 4 }) => {
  const { user } = useAuth();

  const { events, loading } = useActivityTimeline(user!.id);

  return (
    <section aria-labelledby="activity-timeline-title">
      <div className="flex items-center justify-between mb-4">
        <h2 id="activity-timeline-title" className="text-lg font-semibold">
          Linha do tempo de atividades
        </h2>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: limit }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-neutral-100 rounded w-1/2 animate-pulse" />
                <div className="h-2 bg-neutral-100 rounded w-1/3 animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <AnimatePresence initial={false}>
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma atividade foi registrada ainda.</p>
            ) : (
              <ul className="space-y-2" role="list">
                {events.map((ev) =>(
                  <motion.li
                    key={`${ev.type}-${ev.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-start gap-3 py-2"
                    aria-label={`${ev.type} - ${ev.title}`}
                  >
                    <ActivityTypeIcon eventType={ev.type} className="flex-shrink-0" size={20} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                          {ev.type === "content" && `Concluiu o conteúdo “${ev.title}”`}
                          {ev.type === "exercise" && `Finalizou um exercício: ${ev.title}`}
                          {ev.type === "achievement" && `Desbloqueou: ${ev.title}`}
                          {ev.type === "challenge" &&
                            (ev.progress?.isCompleted
                              ? `Concluiu o desafio “${ev.title}”`
                              : `Progresso no desafio “${ev.title}” — ${ev.progress?.current}/${ev.progress?.target}`)}
                        </p>
                        <time
                          className="text-xs text-muted-foreground"
                          dateTime={ev.completedAt ?? ev.unlockedAt ?? ev.startedAt ?? ""}
                        >
                          {formatDate(ev.completedAt ?? ev.unlockedAt ?? ev.startedAt)}
                        </time>
                      </div>

                      {ev.type === "challenge" && ev.progress && (
                        <div className="pt-1">
                          <div className="h-2.5 w-full max-w-sm bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-violet-500 transition-all duration-500 ease-in-out"
                              style={{
                                width: `${Math.min(100, (ev.progress.current / ev.progress.target) * 100)}%`,
                              }}
                              role="progressbar"
                              aria-valuemin={0}
                              aria-valuenow={ev.progress.current}
                              aria-valuemax={ev.progress.target}
                            />
                          </div>
                        </div>
                      )}

                      {ev.type === "exercise" && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {ev.title}
                        </p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
};