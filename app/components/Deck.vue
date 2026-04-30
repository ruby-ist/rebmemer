<template>
  <div class="w-46p flex column gap-10">
    <div ref="deckImage" class="w-100p h-200 bd-rad-10 relative">
      <div class="absolute b-5p r-10p" font="w-600">
        230
        <!-- replace this with cards count -->
      </div>
    </div>
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
          12 Mar, 2026 | 12:34
          <!-- replace this with cards last practiced at -->
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
