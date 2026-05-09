<template>
  <main v-if="deck && currentCard" @click="closeRevealPopUp">
    <nav class="p-18-0 flex align-i-center gap-6 icon-color-white-two">
      <NuxtLink :to="`/decks/${deck.id}`" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h1 class="m-0 color-green-one" font="w-555">Practice</h1>
    </nav>

    <div class="pt-20 flex column gap-28">
      <div class="ta-center" font="s-1.8rem">{{ currentCard.question }}</div>
      <div class="relative">
        <DrawingCanvas v-if="canva" />
        <EditableDivInput
          v-else
          @check-answer="reveal = true"
          ref="editableInput"
        />
        <div class="absolute r-12 b-12 flex align-i-center">
          <button
            class="p-8 -mr-1 pointer"
            :class="{
              'no-bg icon-color-green-two': !canva,
              'bg-color-green-two icon-color-blue-one': canva,
            }"
            border="2 solid color-green-two rad-8-0-0-8"
            @click="canva = true"
          >
            <scribbleIcon class="w-24 h-24" />
          </button>
          <button
            class="p-8 pointer"
            :class="{
              'no-bg icon-color-green-two': canva,
              'bg-color-green-two icon-color-blue-one': !canva,
            }"
            border="2 solid color-green-two rad-0-8-8-0"
            @click="canva = false"
          >
            <textInputIcon class="w-24 h-24" />
          </button>
        </div>
      </div>
    </div>
    <div class="grid place-i-center h-200">
      <button
        @click="reveal = true"
        ref="revealButton"
        class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28"
        border="1px solid color-indigo-one rad-10"
        font="s-1.35rem w-475 f-default-font"
      >
        Check
      </button>
    </div>
    <div
      v-show="reveal"
      ref="revealPopUp"
      class="absolute b-0 l-0 z-1 w-100vw p-40-20-60 bg-color-blue-two flex column align-i-center just-c-center gap-40 icon-color-indigo-one box-size-border-box"
      style="box-shadow: 0 0 50px -16px var(--green-one)"
      border-t="1 solid color-green-one"
      border="rad-6-6-0-0"
    >
      <div font="s-2rem">
        {{ currentCard.answer }}
      </div>
      <div class="flex align-i-center just-c-space-evenly w-100p">
        <div class="flex align-i-center column gap-8">
          <button
            class="bg-color-green-two p-13 pointer"
            border="1 solid color-indigo-one rad-10"
          >
            <questionIcon class="w-32 h-32 -mb-3" />
          </button>
          <span class="color-green-two" font="w-480">Forgot</span>
        </div>
        <div class="flex align-i-center column gap-8">
          <button
            class="bg-color-green-two p-9 pointer"
            border="1 solid color-indigo-one rad-10"
          >
            <wrongIcon class="w-40 h-40 -mb-3" />
          </button>
          <span class="color-green-two" font="w-480">Wrong</span>
        </div>
        <div class="flex align-i-center column gap-8">
          <button
            class="bg-color-green-two p-14 pointer"
            border="1 solid color-indigo-one rad-10"
          >
            <partialIcon class="w-30 h-30 -mb-3" />
          </button>
          <span class="color-green-two" font="w-480">Partial</span>
        </div>
        <div class="flex align-i-center column gap-8">
          <button
            class="bg-color-green-two p-16 pointer"
            border="1 solid color-indigo-one rad-10"
          >
            <tickIcon class="w-26 h-26 -mb-3" />
          </button>
          <span class="color-green-two" font="w-480">Correct</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import type EditableDivInput from "~/components/EditableDivInput.vue";

export default defineNuxtComponent({
  data: () => ({
    deck: null as null | Deck,
    currentCard: null as null | Card,
    canva: false,
    reveal: false,
  }),
  async beforeMount() {
    const deckId = parseInt(this.$route.params.deckId as string);
    this.deck = (await db.decks.get(deckId)) as Deck;
    const cards = await db.cards
      .where("deckId")
      .equals(this.deck.id)
      .limit(1)
      .toArray();
    this.currentCard = cards[0] as Card;
  },
  methods: {
    closeRevealPopUp(e: Event) {
      const revealPopUp = this.$refs.revealPopUp as HTMLElement;
      const revealButton = this.$refs.revealButton as HTMLElement;
      const doneButton = (
        this.$refs.editableInput as InstanceType<typeof EditableDivInput>
      )?.$refs.doneButton as HTMLElement;
      const clickedElement = e.target as HTMLElement;

      if (
        !revealPopUp.contains(clickedElement) &&
        !revealButton.contains(clickedElement) &&
        !doneButton?.contains(clickedElement)
      )
        this.reveal = false;
    },
  },
  watch: {
    reveal(value) {
      if (value) {
        document.body.classList.add("with-popup");
      } else {
        document.body.classList.remove("with-popup");
      }
    },
  },
});
</script>
