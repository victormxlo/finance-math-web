import { v4 as uuid } from 'uuid';

export const mockChallengeProgress = [
  {
    profileId: uuid(),
    userId: uuid(),
    challengeId: uuid(),
    challengeName: 'Desafio de Juros Compostos',
    criteriaKey: 'challenge.juros-compostos',
    currentProgress: 3,
    targetProgress: 5,
    isCompleted: false,
    startedAt: new Date('2025-10-15T13:00:00'),
    completedAt: null,
  },
  {
    profileId: uuid(),
    userId: uuid(),
    challengeId: uuid(),
    challengeName: 'Desafio de Fundamentos Finalizado',
    criteriaKey: 'challenge.fundamentos',
    currentProgress: 4,
    targetProgress: 4,
    isCompleted: true,
    startedAt: new Date('2025-10-08T09:00:00'),
    completedAt: new Date('2025-10-12T18:30:00'),
  },
];