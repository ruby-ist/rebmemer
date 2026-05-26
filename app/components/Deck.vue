<template>
  <div class="w-[calc(50%-10px)] flex column gap-10">
    <NuxtLink :to="`/decks/${deck.id}`" class="color-white-two">
      <div ref="deckImage" class="w-100p h-200 bd-rad-10 relative">
        <div class="absolute b-5p r-10p" font="w-600">
          {{ cardCount }}
        </div>
      </div>
    </NuxtLink>
    <div class="flex column gap-9">
      <NuxtLink :to="`/decks/${deck.id}`">
        <h3 class="m-0 color-green-one" font="w-500">{{ deck.name }}</h3>
      </NuxtLink>
      <div class="break-word" font="s-0.85rem w-400">
        {{ deck.description }}
      </div>
      <div class="icon-color-white-three flex align-i-center gap-4">
        <ClockIcon class="w-10" />
        <div class="color-white-three" font="s-0.75rem">
          {{ reviewedAtAsString(lastPracticedAt) }}
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
      type: Number,
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
