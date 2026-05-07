<template>
  <main v-if="deck && currentCard">
    <nav class="p-18-0 flex align-i-center gap-6 icon-color-white-two">
      <NuxtLink :to="`/decks/${deck.id}`" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h1 class="m-0 color-green-one" font="w-555">Practice</h1>
    </nav>

    <div class="pt-20 flex column gap-28">
      <div class="ta-center" font="s-1.8rem">{{ currentCard.question }}</div>
      <div class="relative">
        <DrawingCanvas v-if="canva" />
        <EditableDivInput v-else />
        <div class="absolute r-12 b-12 flex align-i-center">
          <button
            class="p-8 -mr-1 pointer"
            :class="{
              'no-bg icon-color-green-two': !canva,
              'bg-color-green-two icon-color-blue-one': canva,
            }"
            border="2 solid color-green-two rad-8-0-0-8"
            @click="canva = true"
          >
            <scribbleIcon class="w-24 h-24" />
          </button>
          <button
            class="p-8 pointer"
            :class="{
              'no-bg icon-color-green-two': canva,
              'bg-color-green-two icon-color-blue-one': !canva,
            }"
            border="2 solid color-green-two rad-0-8-8-0"
            @click="canva = false"
          >
            <textInputIcon class="w-24 h-24" />
          </button>
        </div>
      </div>
    </div>
    <div class="grid place-i-center h-200">
      <button
        class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28"
        border="1px solid color-indigo-one rad-10"
        font="s-1.35rem w-475 f-default-font"
      >
        Check
      </button>
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    deck: null as null | Deck,
    currentCard: null as null | Card,
    canva: false,
  }),
  async beforeMount() {
    const deckId = parseInt(this.$route.params.deckId as string);
    this.deck = (await db.decks.get(deckId)) as Deck;
    const cards = await db.cards
      .where("deckId")
      .equals(this.deck.id)
      .limit(1)
      .toArray();
    this.currentCard = cards[0] as Card;
  },
});
</script>
