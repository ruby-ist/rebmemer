<template>
  <div class="p-16-0 flex column gap-8" border="b-1 b-solid b-color-cyan-one">
    <div font="w-450">{{ card.question }}</div>
    <div class="color-white-one">{{ card.answer }}</div>
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
