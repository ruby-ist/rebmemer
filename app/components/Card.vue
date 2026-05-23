<template>
  <div class="p-20-0" border="b-1 b-solid b-color-cyan-one">
    <NuxtLink :to="link ? `/cards/${card.id}` : ''" class="flex column gap-14">
      <div class="flex just-c-space-between">
        <div font="w-450 s-1.2rem" class="color-white-two max-w-80p">
          {{ reversed ? card.answer : card.question }}
        </div>
        <ProgressBar />
      </div>
      <div class="flex just-c-space-between align-i-end">
        <div class="color-white-one max-w-54p" font="s-1.2rem">
          {{ reversed ? card.question : card.answer }}
        </div>
        <div class="color-white-two" font="w-400 s-0.8rem">
          {{
            reversed
              ? reviewedAtAsString(card.lastReverseReviewedAt)
              : reviewedAtAsString(card.lastReviewedAt)
          }}
        </div>
      </div>
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
    reversed: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
