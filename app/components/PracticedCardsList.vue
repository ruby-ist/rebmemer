<template>
  <div class="mt-12 pb-64">
    <div
      class="flex column p-0-16"
      border="1 solid color-cyan-one rad-16"
      font="s-1.1rem w-500"
      v-gsap.stagger.from="{
        opacity: 0,
        duration: 0.45,
        ease: 'expo.in',
        delay: -0.3,
        stagger: {
          each: 0.15,
        },
        onStart: customProgressBarAnimation,
      }"
    >
      <Card
        v-for="card in cards"
        :key="card.id"
        :card="card"
        class="[&:last-child]:border-none"
        :reversed="deck.reversed"
        :link="false"
      />
    </div>
    <div class="w-100p grid place-i-center">
      <button
        @click="$router.back()"
        class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28 w-100p active:bg-color-green-one active:scale-96"
        border="1px solid color-indigo-one rad-10"
        font="s-1.35rem w-475 f-default-font"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
    deck: {
      type: Object as PropType<Deck>,
      required: true,
    },
  },
  methods: {
    customProgressBarAnimation() {
      // revert already started animation
      gsap.getTweensOf(".progress-gradient")[0]?.revert();
      gsap.killTweensOf(".progress-gradient");
      gsap.from(".progress-gradient", {
        clipPath: "inset(0 100% 0 0)",
        stagger: {
          each: 0.15,
        },
      });
    },
  },
});
</script>
