export async function useDeckFromParams(): Promise<Deck> {
  const route = useRoute();
  const deckId = parseInt(route.params.deckId as string);
  return (await db.decks.get(deckId)) as Deck;
}
