<template>
  <div class="color-white-three p-4-0 flex column gap-6">
    <div>
      <h4 class="m-0" font="w-475">Description:</h4>
      <div class="m-6-0">{{ deck.description }}</div>
    </div>
    <div class="flex row gap-6">
      <h4 class="m-0" font="w-475">Cards Practiced:</h4>
      <div class="mt-0.075rem" font="s-0.9rem">
        {{ practicedCardsCount }} / {{ totalCardsCount }}
      </div>
    </div>
    <div class="flex row gap-6 align-i-center">
      <h4 class="m-0" font="w-475">Last practiced at:</h4>
      <div class="mt-2" font="s-0.85rem">
        {{ reviewedAtAsString(lastPracticedAt) }}
      </div>
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
    totalCardsCount: {
      type: Number,
      required: true,
    },
    practicedCardsCount: {
      type: Number,
      required: true,
    },
    lastPracticedAt: {
      type: Number,
      required: true,
    },
  },
});
</script>
