export async function useCardFromParams(): Promise<Card> {
  const route = useRoute();
  const cardId = parseInt(route.params.cardId as string);
  return (await db.cards.get(cardId)) as Card;
}

export async function useCardsFromDeck(id: number): Promise<Card[]> {
  return await db.cards.where("deckId").equals(id).toArray();
}
