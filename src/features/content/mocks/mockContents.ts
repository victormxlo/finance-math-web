import type { ContentSectionDTO } from "@/features/content/dtos/contentSectionDto";
import type { UserContentProgressDTO } from "@/features/content/dtos/userContentProgressDto";
import type { CompleteContentResponseDTO } from "@/features/content/dtos/completeContentResponseDto";
import type { ContentDTO } from "@/features/content/dtos/contentDto";

export const mockContents: ContentDTO[] = [
  {
    id: "aab50e04-d3fe-40fa-a95f-b36a00e7b9b5",
    title: "Juros Simples",
    body:
      "Os juros simples são uma forma de cálculo de juros onde o valor a ser pago é sempre calculado sobre o valor inicial (principal), sem considerar os juros acumulados ao longo do tempo. Essa modalidade é utilizada em operações financeiras de curto prazo, como empréstimos e investimentos, sendo de fácil compreensão e previsão, já que os juros permanecem constantes durante todo o período.",
    mediaUrl: null,
    categoryId: "1-1",
    createdBy: "bb33198d-af7a-4a5e-814d-b36900f255c6",
    createdAt: "2025-10-02T11:03:41.184723",
    updatedAt: null,
    exerciseIds: ["426002e2-2dc3-437f-aa85-5068feefda48"],
    sectionIds: ["642f1913-0c78-4602-8fb0-b36a00ed567c", "4d8c735c-1213-4c48-bae1-b36a01368358"],
  },
  {
    id: "c2",
    title: "Fórmulas e exemplos de Juros Simples",
    body: "Aprenda a calcular juros simples com exemplos práticos.",
    mediaUrl: null,
    categoryId: "1-1",
    createdBy: "user1",
    createdAt: "2025-09-01T08:00:00.000Z",
    updatedAt: null,
    exerciseIds: [],
    sectionIds: []
  },
  {
    id: "c3",
    title: "Entendendo Juros Compostos",
    body: "O poder dos juros compostos em aplicações financeiras.",
    mediaUrl: null,
    categoryId: "1-2",
    createdBy: "user1",
    createdAt: "2025-09-01T08:00:00.000Z",
    updatedAt: null,
    exerciseIds: [],
    sectionIds: []
  },
  {
    id: "c4",
    title: "Sistemas de Amortização",
    body: "Como funcionam as modalidades de amortização de dívidas.",
    mediaUrl: null,
    categoryId: "2",
    createdBy: "user1",
    createdAt: "2025-09-01T08:00:00.000Z",
    updatedAt: null,
    exerciseIds: [],
    sectionIds: []
  }
];

export const mockContent: ContentDTO = {
  id: "aab50e04-d3fe-40fa-a95f-b36a00e7b9b5",
  title: "Juros Simples",
  body:
    "Os juros simples são uma forma de cálculo de juros onde o valor a ser pago é sempre calculado sobre o valor inicial (principal), sem considerar os juros acumulados ao longo do tempo. Essa modalidade é utilizada em operações financeiras de curto prazo, como empréstimos e investimentos, sendo de fácil compreensão e previsão, já que os juros permanecem constantes durante todo o período.",
  mediaUrl: null,
  categoryId: "955a6e76-4b5a-4d1a-bd1c-b36a00e68a1e",
  createdBy: "bb33198d-af7a-4a5e-814d-b36900f255c6",
  createdAt: "2025-10-02T11:03:41.184723",
  updatedAt: null,
  exerciseIds: ["426002e2-2dc3-437f-aa85-5068feefda48"],
  sectionIds: ["642f1913-0c78-4602-8fb0-b36a00ed567c", "4d8c735c-1213-4c48-bae1-b36a01368358"],
};

export const mockSections: ContentSectionDTO[] = [
  {
    id: "642f1913-0c78-4602-8fb0-b36a00ed567c",
    title: "O que são?",
    body:
      'Os **juros simples** são a forma mais básica de calcular quanto um dinheiro “cresce” ao longo do tempo, seja em um empréstimo, investimento ou multa.\n\nNele, os juros são **sempre calculados em cima do valor inicial (capital)**, sem considerar os juros que já foram acumulados nos períodos anteriores.\n\nIsso significa que os juros não mudam de um mês para o outro.\n\nSe no primeiro mês você pagou R$ 20 de juros, no segundo mês também serão R$ 20, no terceiro também, e assim por diante.',
    order: 0,
    contentId: "aab50e04-d3fe-40fa-a95f-b36a00e7b9b5",
  },
  {
    id: "4d8c735c-1213-4c48-bae1-b36a01368358",
    title: "Para que servem?",
    body:
      'Os **juros simples** servem para calcular de forma rápida e prática quanto você vai pagar ou receber em uma operação financeira de **curto prazo**, quando não há necessidade de cálculos muito sofisticados.\n\nEles são usados em situações do dia a dia que envolvem:\n\n- **Empréstimos informais:** quando alguém empresta dinheiro e combina uma taxa fixa de juros ao mês.\n- **Multas e atrasos:** geralmente, boletos e contas podem aplicar um valor fixo de multa por atraso, baseado em juros simples.\n- **Operações comerciais de curto prazo:** desconto de duplicatas, títulos ou cheques em prazos pequenos.\n- **Investimentos rápidos:** algumas aplicações de curtíssimo prazo usam juros simples para simplificar o cálculo.',
    order: 1,
    contentId: "aab50e04-d3fe-40fa-a95f-b36a00e7b9b5",
  },
];

// export const mockProgress: UserContentProgressDTO[] = [
//   {
//     profileId: "pf-1",
//     userId: "88b8afb9-2080-48f8-a6be-622067876fc5",
//     contentId: "aab50e04-d3fe-40fa-a95f-b36a00e7b9b5",
//     contentTitle: "Juros Simples",
//     categoryId: "955a6e76-4b5a-4d1a-bd1c-b36a00e68a1e",
//     categoryName: "Juros",
//     completedAt: "2025-10-02T11:03:41.184723",
//   },
// ];

export const mockProgress: UserContentProgressDTO[] = [
  {
    profileId: "pf-1",
    userId: "88b8afb9-2080-48f8-a6be-622067876fc5",
    contentId: "aab50e04-d3fe-40fa-a95f-b36a00e7b9b5",
    contentTitle: "Juros Simples",
    categoryId: "955a6e76-4b5a-4d1a-bd1c-b36a00e68a1e",
    categoryName: "Juros",
    completedAt: "",
  },
];

export const mockCompleteResponse: CompleteContentResponseDTO = {
  contentId: mockContent.id,
  moduleCompleted: false,
  reward: { xpAwarded: 50, virtualCurrencyAwarded: 10 },
  profile: { userId: "88b8afb9-2080-48f8-a6be-622067876fc5", levelId: 3, currentStreakDays: 4, levelName: "Finance Master", experiencePoints: 1234, virtualCurrency: 123 },
  achievementsUnlocked: [{ id: "ach-1", name: "Starting is the most important step", description: "Complete your first content", experienceReward: 30, virtualCurrencyReward: 20 }],
  completedAtUtc: new Date().toISOString(),
  challengesProgress: [],
  nextRecommended: [
    { id: "next-1", title: "Juros Compostos", contentId: "c-next-1", type: "content", difficulty: "easy", category: "Juros" },
  ],
};