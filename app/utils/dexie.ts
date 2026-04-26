import { Dexie, type EntityTable } from "dexie";

interface Deck {
  id: number;
  name: string;
  reversible: boolean;
  cardsPerRound: number;
  lastPracticedAt: number | null;
  image: Blob | null;
}

interface Card {
  id: number;
  question: string;
  answer: string;
  createdAt: number;
  familarity: number;
  lastReviewedAt: number;
  reverseFamilarity: number;
  deckId: number;
}

const db = new Dexie("rebmemer") as Dexie & {
  decks: EntityTable<Deck, "id">;
  cards: EntityTable<Card, "id">;
};

db.version(1).stores({
  decks: "++id, &name",
  cards:
    "++id, question, answer, familarity, reverseFamilarity, lastReviewedAt, deckId",
});

export type { Deck, Card };
export { db };
