export interface ContentDTO {
  id: string;
  title: string;
  body: string;
  mediaUrl?: string | null;
  categoryId: string;
  createdBy: string;
  createdAt: string; // ISO
  updatedAt?: string | null;
  exerciseIds: string[];
  sectionIds: string[];
  order?: number;
  isLastInModule?: boolean;
}