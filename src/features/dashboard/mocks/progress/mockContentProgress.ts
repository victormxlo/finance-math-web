import { v4 as uuid } from 'uuid';

export const mockContentProgress = [
  {
    profileId: uuid(),
    userId: uuid(),
    contentId: uuid(),
    contentTitle: 'Introdução à Matemática Financeira',
    categoryId: uuid(),
    categoryName: 'Fundamentos',
    completedAt: new Date('2025-10-10T14:30:00'),
  },
  {
    profileId: uuid(),
    userId: uuid(),
    contentId: uuid(),
    contentTitle: 'Juros Simples',
    categoryId: uuid(),
    categoryName: 'Juros',
    completedAt: new Date('2025-10-12T09:15:00'),
  },
  {
    profileId: uuid(),
    userId: uuid(),
    contentId: uuid(),
    contentTitle: 'Juros Compostos',
    categoryId: uuid(),
    categoryName: 'Juros',
    completedAt: new Date('2025-10-15T17:45:00'),
  },
];