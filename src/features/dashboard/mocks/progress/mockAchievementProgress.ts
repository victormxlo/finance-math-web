import { v4 as uuid } from 'uuid';

export const mockAchievementProgress = [
  {
    profileId: uuid(),
    userId: uuid(),
    achievementId: uuid(),
    achievementName: 'Primeiro Conteúdo Concluído',
    criteriaKey: 'content.completed.first',
    unlockedAt: new Date('2025-10-10T14:45:00'),
  },
  {
    profileId: uuid(),
    userId: uuid(),
    achievementId: uuid(),
    achievementName: '5 Exercícios Resolvidos',
    criteriaKey: 'exercise.completed.5',
    unlockedAt: new Date('2025-10-18T11:00:00'),
  },
];