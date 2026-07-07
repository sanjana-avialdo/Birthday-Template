export type CardTheme = "aurora-sky" | "midnight-rose";

export interface Card {
  id: string;
  slug: string;
  recipientName: string;
  senderName: string;
  message: string | null;
  theme: CardTheme;
  musicUrl: string | null;
  pinHint: string | null;
  createdAt: string;
}

export interface CardMedia {
  id: string;
  cardId: string;
  storagePath: string;
  mediaType: "image" | "video";
  position: number;
}

export interface Wish {
  id: string;
  cardId: string;
  authorName: string;
  message: string;
  createdAt: string;
}
