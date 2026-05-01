<template>
  <main v-if="deck">
    <nav class="p-14-0 flex align-i-center gap-6">
      <NuxtLink to="/decks" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h2 class="m-0 color-green-one" font="w-500">{{ deck.name }}</h2>
    </nav>
    <AboutDeck
      :deck="deck"
      :cardCount="cards.length"
      :lastPracticedAt="lastPracticedAt"
    />
    <div class="m-20-0">
      <button
        class="bg-color-green-one color-indigo-one w-100p p-8 pointer"
        border="none rad-10"
        font="s-1.5rem w-600 f-default-font"
      >
        Practice
      </button>
    </div>
    <div class="flex just-c-center w-100p m-30-0-20">
      <div class="bg-color-green-two h-1 w-50p"></div>
    </div>
    <CardList :deck="deck" :cards="cards" />
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    deck: null as null | Deck,
    cards: [] as Card[],
  }),
  async beforeMount() {
    const deckId = parseInt(this.$route.params.deckId as string);
    this.deck = (await db.decks.get(deckId)) as Deck;
    this.cards = await db.cards.where("deckId").equals(this.deck!.id).toArray();
  },
  computed: {
    lastPracticedAt() {
      const lastPracticedCard = this.cards.sort(
        (a, b) => b.lastReviewedAt - a.lastReviewedAt,
      )[0];
      return lastPracticedCard ? lastPracticedCard.lastReviewedAt : null;
    },
  },
});
</script>

<style scoped>
nav {
  --icon: var(--white-two);
}
</style>
