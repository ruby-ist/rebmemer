<template>
  <main v-if="deck && currentCard">
    <nav
      class="p-18-0 flex just-c-space-between align-i-center icon-color-white-two"
    >
      <div class="flex align-i-center gap-6">
        <a @click="$router.back()" class="flex align-i-center pointer">
          <backIcon class="w-24" />
        </a>
        <h1 class="m-0 color-green-one" font="w-555">
          {{ finishedPractice ? "Practiced Cards" : "Practice" }}
        </h1>
      </div>
      <div font="s-1.4rem" v-if="!finishedPractice">
        {{ cardsCopy.length - cards.length }} / {{ cardsCopy.length }}
      </div>
    </nav>

    <div v-if="!finishedPractice">
      <div class="pt-20 flex column gap-28">
        <div class="ta-center" font="s-1.8rem">
          {{ deck.reversed ? currentCard.answer : currentCard.question }}
        </div>
        <div class="relative">
          <DrawingCanvas v-if="canva" ref="drawingCanvas" />
          <EditableDivInput
            v-else
            @check-answer="reveal = true"
            ref="editableInput"
          />
          <div class="absolute r-12 b-12 flex align-i-center">
            <button
              class="p-8 -mr-1 pointer"
              :class="{
                'no-bg icon-color-green-one': !canva,
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
                'no-bg icon-color-green-one': canva,
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
          class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28 active:bg-color-green-one active:scale-96"
          border="1px solid color-indigo-one rad-10"
          font="s-1.35rem w-475 f-default-font"
        >
          Check
        </button>
      </div>
      <div
        v-if="reveal"
        class="absolute h-100dvh w-100dvw t-0 l-0 z-0"
        @click="reveal = false"
      ></div>
      <GSAPTransition
        :hidden="{ y: '100%', duration: 0.4, opacity: 1, ease: 'sine.out' }"
      >
        <AssessmentPopup
          v-if="reveal"
          ref="revealPopUp"
          :card="currentCard"
          :deck="deck"
          @next="moveToNextCard"
        />
      </GSAPTransition>
    </div>
    <PracticedCardsList
      v-else
      class="mt-24 pb-64"
      :cards="cardsCopy"
      :deck="deck"
    />
  </main>
</template>

<script lang="ts">
import type DrawingCanvas from "~/components/DrawingCanvas.vue";
import type EditableDivInput from "~/components/EditableDivInput.vue";

export default defineNuxtComponent({
  async setup() {
    const deck = ref(await useDeckFromParams());
    const allCards = await useCardsFromDeck(deck.value.id);
    const cards = ref(fetchCardsToBePracticed(allCards, deck.value));
    return {
      deck,
      cards,
      cardsCopy: [...cards.value],
      currentCard: ref(cards.value.shift() || null),
      canva: ref(false),
      reveal: ref(false),
      finishedPractice: ref(false),
    };
  },
  methods: {
    moveToNextCard() {
      const nextCard = this.cards.shift();
      if (!nextCard) {
        this.reveal = false;
        this.finishedPractice = true;
      } else {
        this.currentCard = nextCard;
        this.reveal = false;
        this.resetAnswers();
        const editableInput = this.$refs.editableInput as InstanceType<
          typeof EditableDivInput
        >;
        if (editableInput)
          (editableInput.$refs.answerInput as HTMLInputElement).focus();
      }
    },
    resetAnswers() {
      const editableDiv = this.$refs.editableInput as InstanceType<
        typeof EditableDivInput
      >;
      const drawingCanvas = this.$refs.drawingCanvas as InstanceType<
        typeof DrawingCanvas
      >;
      if (editableDiv) editableDiv.clearAnswer();
      if (drawingCanvas) drawingCanvas.clearCanvas();
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
