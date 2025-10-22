import { v4 as uuid } from 'uuid';

export const mockExerciseProgress = [
  {
    profileId: uuid(),
    userId: uuid(),
    exerciseId: uuid(),
    exerciseQuestion: 'Qual é o montante de um investimento de R$1.000,00 a 10% ao ano por 2 anos?',
    categoryId: uuid(),
  },
  {
    profileId: uuid(),
    userId: uuid(),
    exerciseId: uuid(),
    exerciseQuestion: 'Calcule os juros simples de um empréstimo de R$500,00 por 3 meses a 2% ao mês.',
    categoryId: uuid(),
  },
];