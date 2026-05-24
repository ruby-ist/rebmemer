<template>
  <div
    class="absolute b-0 l-0 z-1 w-100vw p-20-20-60 bg-color-blue-two flex column align-i-center just-c-center gap-40 icon-color-indigo-one box-size-border-box"
    style="box-shadow: 0 0 300px 0px var(--indigo-one)"
    border="rad-6p-6p-0-0"
    border-t="1 solid color-cyan-one "
  >
    <div class="flex just-c-center w-100p">
      <div class="bg-color-cyan-one h-3 w-36p" border="rad-50"></div>
    </div>
    <div font="s-2rem">
      {{ deck.reversed ? card.question : card.answer }}
    </div>
    <div
      class="flex align-i-center just-c-space-evenly w-100p"
      v-gsap.stagger.from="{
        scale: 0,
        duration: 0.3,
        delay: 0.25,

        stagger: {
          each: 0.035,
          from: 'center',
        },
      }"
    >
      <div class="flex align-i-center column gap-8">
        <button
          @click="addPenaltyToCard(deck.forgottenAnswerPenalty)"
          class="bg-color-green-two p-13 pointer"
          border="1 solid color-indigo-one rad-10"
        >
          <questionIcon class="w-32 h-32 -mb-3" />
        </button>
        <span class="color-green-two" font="w-480">Forgot</span>
      </div>
      <div class="flex align-i-center column gap-8">
        <button
          @click="addPenaltyToCard(deck.wrongAnswerPenalty)"
          class="bg-color-green-two p-9 pointer"
          border="1 solid color-indigo-one rad-10"
        >
          <wrongIcon class="w-40 h-40 -mb-3" />
        </button>
        <span class="color-green-two" font="w-480">Wrong</span>
      </div>
      <div class="flex align-i-center column gap-8">
        <button
          @click="addPenaltyToCard(deck.partialAnswerPenalty)"
          class="bg-color-green-two p-14 pointer"
          border="1 solid color-indigo-one rad-10"
        >
          <partialIcon class="w-30 h-30 -mb-3" />
        </button>
        <span class="color-green-two" font="w-480">Partial</span>
      </div>
      <div class="flex align-i-center column gap-8">
        <button
          @click="leapFowardFamilarity"
          class="bg-color-green-two p-16 pointer"
          border="1 solid color-indigo-one rad-10"
        >
          <tickIcon class="w-26 h-26 -mb-3" />
        </button>
        <span class="color-green-two" font="w-480">Correct</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    deck: {
      type: Object as PropType<Deck>,
      required: true,
    },
  },
  emits: ["next"],
  methods: {
    leapFowardFamilarity() {
      if (!this.card) return;

      if (this.deck.reversed) {
        this.card.reverseFamilarity +=
          (MAX_FAMILARITY - this.card.reverseFamilarity) *
          (this.deck.correctAnswerLeap / 100.0);
        this.card.lastReverseReviewedAt = Date.now();
      } else {
        this.card.familarity +=
          (MAX_FAMILARITY - this.card.familarity) *
          (this.deck.correctAnswerLeap / 100.0);
        this.card.lastReviewedAt = Date.now();
      }
      this.savecard().then(() => {
        this.$emit("next");
      });
    },
    addPenaltyToCard(penatly: number) {
      if (!this.card) return;

      if (this.deck.reversed) {
        this.card.reverseFamilarity *= penatly / 100.0;
        this.card.lastReverseReviewedAt = Date.now();
      } else {
        this.card.familarity *= penatly / 100.0;
        this.card.lastReviewedAt = Date.now();
      }
      this.savecard().then(() => {
        this.$emit("next");
      });
    },
    async savecard() {
      await db.cards.put(Object.assign({}, this.card));
    },
  },
});
</script>
