export interface NoticeTypes {
  id: string;
  documentId: string;
  title: string;
  description: string;
  image: { url: string }[] | null;
  publishedAt: Date;
  category: string;
}
