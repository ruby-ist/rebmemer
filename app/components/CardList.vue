<template>
  <div>
    <div class="cards flex align-i-center just-c-space-between mb-8">
      <h2 class="m-0 color-cyan-one">Cards</h2>
      <NuxtLink :to="`/decks/${deck.id}/cards/new`">
        <PlusIcon class="w-36 pointer" />
      </NuxtLink>
    </div>
    <div class="mb-20" font="w-500">
      <label>Sort by&ensp;</label>
      <select
        class="bg-color-blue-one p-4 color-cyan-one no-outline ta-center field-sizing-content"
        border="none rad-5"
        font="s-1rem w-500 f-default-font"
      >
        <option value="name">Alphabetic</option>
        <option value="familarity">Familarity</option>
        <option value="last_practiced_at">Last Practiced</option>
        <option value="created_at">Created Date</option>
      </select>
    </div>
    <div
      v-if="cards.length !== 0"
      class="bg-color-blue-one flex column p-0-16"
      border="2 solid color-cyan-one rad-16"
      font="s-1.1rem w-500"
    >
      <Card v-for="card in cards" :key="card.id" :card="card" />
    </div>
    <div
      v-else
      class="bg-color-blue-one flex column p-16 ta-center"
      border="rad-16"
      font="s-1.1rem w-500"
    >
      No Cards Found!
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    deck: {
      type: Object as PropType<Deck>,
      required: true,
    },
  },
  data: () => ({
    cards: [] as Card[],
  }),
  async beforeMount() {
    this.cards = await this.fetchCards();
  },
  methods: {
    async fetchCards() {
      const cards = await db.cards
        .where("deckId")
        .equals(this.deck.id)
        .toArray();
      return cards;
    },
  },
});
</script>

<style scoped>
.cards {
  --icon: var(--cyan-one);
}
</style>
