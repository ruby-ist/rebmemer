<template>
  <main v-if="deck && currentCard">
    <nav class="p-18-0 flex align-i-center gap-6">
      <NuxtLink :to="`/decks/${deck.id}`" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h1 class="m-0 color-green-one" font="w-555">Practice</h1>
    </nav>

    <div class="pt-20 flex column gap-28">
      <div class="ta-center" font="s-1.8rem">{{ currentCard.question }}</div>
      <DrawingCanvas v-if="canva" />
      <div v-else class="relative">
        <div v-show="showKeyboardDownButton" class="absolute r-16 t-12">
          <button
            class="new-line-button bg-color-green-two no-bg no-outline border-none pointer p-2-4"
            border="rad-10"
            @click="blurAnwerInput"
          >
            <keyboardDownIcon class="w-28 h-28" />
          </button>
        </div>
        <div
          class="grid place-i-center bg-color-blue-one p-24-12 w-100p h-[calc(100vw-40px)] box-size-border-box oflow-auto"
          border="1 solid color-cyan-one rad-20"
          @click="($refs.answerInput as HTMLElement).focus()"
        >
          <div
            contenteditable="true"
            ref="answerInput"
            class="ta-center [&:focus]:no-outline color-white-one min-h-1em min-w-1"
            font="s-1.5rem w-425 f-default-font"
            @keyup="
              answer = ($refs.answerInput as HTMLElement).innerText.trim()
            "
            @blur="showKeyboardDownButton = false"
            @focus="showKeyboardDownButton = true"
          ></div>
          <span
            v-show="answer.length === 0"
            class="absolute color-white-three z-0"
            font="s-1.5rem"
          >
            Type Here
          </span>
        </div>
      </div>
    </div>
    <div class="grid place-i-center h-200">
      <button
        class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28"
        border="1px solid color-indigo-one rad-10"
        font="s-1.35rem w-475 f-default-font"
      >
        Check
      </button>
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    deck: null as null | Deck,
    currentCard: null as null | Card,
    answer: "",
    canva: false,
    showKeyboardDownButton: false,
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
    blurAnwerInput() {
      const answerInput = this.$refs.answerInput as HTMLElement;
      answerInput.blur();
    },
  },
});
</script>

<style scoped>
nav {
  --icon: var(--white-two);
}

.new-line-button {
  --icon: var(--green-two);
}
</style>
