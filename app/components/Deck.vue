<template>
  <div class="w-46p flex column gap-10">
    <div ref="deckImage" class="w-100p h-200 bd-rad-10 relative">
      <div class="absolute b-5p r-10p" font="w-600" style="color: #d9ffff">
        230
        <!-- replace this with cards count -->
      </div>
    </div>
    <div class="flex column gap-6">
      <h3 class="font-w-500 m-0">{{ deck.name }}</h3>
      <div class="font-s-0.8rem break-word" style="color: #d9ffff">
        {{ deck.description }}
      </div>
      <div class="flex align-i-center gap-4">
        <ClockIcon class="w-10" />
        <div class="font-s-0.7rem" style="color: #9dc0e2">
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
      deckImage.style.background = `linear-gradient(transparent 50%, #2c6990), url(${imageUrl}) center / cover`;
    },
  },

  mounted() {
    this.setDeckImage();
  },
});
</script>
