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
    lastPracticedAtTime: {} as {
      [key: number]: number;
    },
    cardCounts: {} as {
      [key: number]: number;
    },
  }),
  async mounted() {
    this.decks = await db.decks.toArray();
    await db.cards
      .orderBy("lastReviewedAt")
      .reverse()
      .each((card) => {
        this.lastPracticedAtTime[card.deckId] ||= card.lastReviewedAt;
        this.cardCounts[card.deckId] = (this.cardCounts[card.deckId] || 0) + 1;
      });
  },
});
</script>
