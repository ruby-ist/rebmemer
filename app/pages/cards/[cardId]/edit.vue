<template>
  <main v-if="card && deck">
    <nav class="p-18-0 flex align-i-center gap-6 icon-color-white-two">
      <NuxtLink :to="`/cards/${deck.id}`" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h2 class="m-0 color-green-one" font="w-600">Edit Card</h2>
    </nav>
    <div class="p-10-0">
      <CardForm :card="card" :deck="deck" />
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    card: null as Card | null,
    showMenu: false,
    deck: null as Deck | null,
  }),
  async beforeMount() {
    const cardId = parseInt(this.$route.params.cardId as string);
    this.card = (await db.cards.get(cardId)) as Card;
    this.deck = (await db.decks.get(this.card.deckId)) as Deck;
  },
});
</script>
