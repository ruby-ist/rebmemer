<template>
  <div class="w-46p flex column gap-10">
    <NuxtLink :to="`/decks/${deck.id}`" class="color-white-two">
      <div ref="deckImage" class="w-100p h-200 bd-rad-10 relative">
        <div class="absolute b-5p r-10p" font="w-600">
          {{ cardCount }}
        </div>
      </div>
    </NuxtLink>
    <div class="flex column gap-6">
      <NuxtLink :to="`/decks/${deck.id}`">
        <h3 class="m-0 color-green-one" font="w-600">{{ deck.name }}</h3>
      </NuxtLink>
      <div class="break-word" font="s-0.8rem w-500">
        {{ deck.description }}
      </div>
      <div class="timestamp flex align-i-center gap-4">
        <ClockIcon class="w-10" />
        <div class="color-white-three" font="s-0.7rem">
          {{
            lastPracticedAt ? new Date(lastPracticedAt).toLocaleString() : "---"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    deck: {
      type: {} as PropType<Deck>,
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

  methods: {
    setDeckImage() {
      const deckImage = this.$refs.deckImage as HTMLElement;
      if (!deckImage) return;

      const imageUrl = URL.createObjectURL(this.deck.image as Blob);
      deckImage.style.background = `linear-gradient(transparent 50%, var(--blue-one)), url(${imageUrl}) center / cover`;
    },
  },

  mounted() {
    this.setDeckImage();
  },
});
</script>

<style scoped>
.timestamp {
  --icon: var(--white-three);
}
</style>
