<template>
  <div class="p-16-0" border="b-1 b-solid b-color-cyan-one">
    <NuxtLink :to="`/cards/${card.id}`" class="flex column gap-8">
      <div font="w-450" class="color-white-two">{{ card.question }}</div>
      <div class="color-white-one">{{ card.answer }}</div>
    </NuxtLink>
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
