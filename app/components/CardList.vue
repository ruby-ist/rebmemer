<template>
  <div class="cards">
    <div class="flex align-i-center just-c-space-between mb-8">
      <h2 class="m-0 color-green-two" font="w-475">Cards</h2>
      <NuxtLink :to="`/decks/${deck.id}/cards/new`">
        <PlusIcon class="w-36 pointer" />
      </NuxtLink>
    </div>
    <div class="mb-20 flex align-i-center gap-8" font="w-450">
      <label>Sort by</label>
      <select
        class="bg-color-blue-one p-4 color-green-two no-outline ta-center field-sizing-content"
        border="none rad-5"
        font="s-1rem w-450 f-default-font"
        v-model="sortByKey"
      >
        <option value="question">Question</option>
        <option value="answer">Answer</option>
        <option value="familarity">Familarity</option>
        <option value="lastReviewedAt">Last Practiced</option>
        <option value="createdAt">Created Date</option>
      </select>
      <button
        @click="sortByAsc = !sortByAsc"
        class="no-bg no-outline"
        border="none"
      >
        <ascendingSortIcon class="w-24" v-if="sortByAsc" />
        <descendingSortIcon class="w-24" v-else />
      </button>
    </div>
    <div
      v-if="cards.length !== 0"
      class="flex column p-0-16"
      border="1 solid color-cyan-one rad-16"
      font="s-1.1rem w-500"
    >
      <Card
        v-for="card in sortedCards"
        :key="card.id"
        :card="card"
        class="[&:last-child]:border-none"
      />
    </div>
    <div
      v-else
      class="bg-color-blue-one flex column p-24 ta-center"
      border="rad-16"
      font="s-1.1rem"
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
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
  },
  data: () => ({
    sortByKey: "createdAt",
    sortByAsc: true,
  }),
  computed: {
    sortedCards(): Card[] {
      return [...this.cards].sort((cardOne, cardTwo) => {
        // @ts-expect-error
        const valueOne = cardOne[this.sortByKey];
        // @ts-expect-error
        const valueTwo = cardTwo[this.sortByKey];

        if (typeof valueOne === "string") {
          return this.sortByAsc
            ? valueOne.localeCompare(valueTwo)
            : valueTwo.localeCompare(valueOne);
        }

        return this.sortByAsc ? valueOne - valueTwo : valueTwo - valueOne;
      });
    },
  },
});
</script>

<style scoped>
.cards {
  --icon: var(--green-two);
}
</style>
