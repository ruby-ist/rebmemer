<template>
  <div class="p-16-0" border="b-1 b-solid b-color-cyan-one">
    <div>{{ card.question }}</div>
    <div class="color-white-one" font="w-400">{{ card.answer }}</div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
  },
});
</script>
