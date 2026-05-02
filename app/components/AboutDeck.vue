<template>
  <div class="color-white-three p-4-0 flex column gap-6">
    <div>
      <h4 class="m-0" font="w-475">Description:</h4>
      <div class="m-6-0">{{ deck.description }}</div>
    </div>
    <div class="flex row gap-4">
      <h4 class="m-0" font="w-475">Cards Count:</h4>
      <div>{{ cardCount }}</div>
    </div>
    <div class="flex row gap-4 align-i-center">
      <h4 class="m-0" font="w-475">Last practiced:</h4>
      <div class="mt-2" font="s-0.85rem">
        {{
          lastPracticedAt ? new Date(lastPracticedAt).toLocaleString() : "---"
        }}
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
    cardCount: {
      type: Number,
      required: true,
    },
    lastPracticedAt: {
      type: [Number, null],
      required: true,
    },
  },
});
</script>
