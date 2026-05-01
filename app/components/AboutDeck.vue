<template>
  <div class="color-white-three p-4-0 flex column gap-6">
    <div>
      <h4 class="m-0">Description:</h4>
      <div>{{ deck.description }}</div>
    </div>
    <div class="flex row gap-4">
      <h4 class="m-0">Count:</h4>
      <div>{{ 230 }}</div>
    </div>
    <div class="flex row gap-4">
      <h4 class="m-0">Last practiced:</h4>
      <div>12 Mar, 2026 | 12:34</div>
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
});
</script>
