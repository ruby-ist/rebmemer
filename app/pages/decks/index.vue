<template>
  <main>
    <nav class="p-14-0">
      <h1 class="m-0 color-green-one" font="w-600">Decks</h1>
    </nav>
    <div class="p-10-0-100 flex wrap row gap-20-8p">
      <Deck
        v-for="deck in decks"
        :key="deck.id"
        :deck="deck"
        :cardCount="cardCounts[deck.id] || 0"
        :lastPracticedAt="lastPracticedAtTime[deck.id] || null"
      />
    </div>
    <AddDeckButton />
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    decks: [] as globalThis.Deck[],
    lastPracticedAtTime: {} as { [key: number]: number },
    cardCounts: {} as { [key: number]: number },
  }),
  async created() {
    const decks = await db.decks.toArray();

    const cardCounts = {} as { [key: number]: number };
    const lastPracticedAtTime = {} as { [key: number]: number };

    await db.cards
      .orderBy("lastReviewedAt")
      .reverse()
      .each((card) => {
        lastPracticedAtTime[card.deckId] ||= card.lastReviewedAt;
        cardCounts[card.deckId] = (cardCounts[card.deckId] || 0) + 1;
      });

    this.decks = decks;
    this.cardCounts = cardCounts;
    this.lastPracticedAtTime = lastPracticedAtTime;
  },
});
</script>
