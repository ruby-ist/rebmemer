<template>
  <main v-if="deck">
    <nav class="p-18-0 flex align-i-center gap-6">
      <NuxtLink :to="`/decks/${deck.id}`" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h2 class="m-0 color-green-one" font="w-600">New Card</h2>
    </nav>
    <div class="p-10-0">
      <form ref="form" class="flex column gap-20" font="s-1.15rem">
        <div class="flex align-i-center gap-8">
          <label for="Deck" class="color-white-two"> Deck:</label>
          <div
            class="inline-block bg-color-blue-one color-green-one p-4-8"
            border="none rad-5"
            font="s-0.9rem w-500"
          >
            {{ deck.name }}
          </div>
        </div>
        <div>
          <label for="question" class="mb-10 block color-white-two">
            Question:
          </label>

          <textarea
            id="question"
            name="question"
            class="bg-color-blue-one [&:focus]:no-outline color-green-two p-12 w-100p h-144 box-size-border-box no-resize oflow-auto"
            border="1 solid color-cyan-one rad-10"
            font="s-1.15rem w-425 f-default-font"
            autocomplete="off"
          />
        </div>

        <div>
          <label for="answer" class="mb-10 block color-white-two">
            Answer:
          </label>

          <textarea
            id="answer"
            name="answer"
            class="bg-color-blue-one [&:focus]:no-outline color-green-two p-12 w-100p h-144 box-size-border-box no-resize oflow-auto"
            border="1 solid color-cyan-one rad-10"
            font="s-1.15rem w-425 f-default-font"
            autocomplete="off"
          />
        </div>

        <div class="w-100p grid place-i-center">
          <input
            type="submit"
            value="Create Card"
            class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28"
            border="1px solid color-indigo-one rad-10"
            font="s-1.35rem w-475 f-default-font"
            @click="handleFormSubmission"
          />
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    deck: null as null | Deck,
  }),
  async beforeMount() {
    const deckId = parseInt(this.$route.params.deckId as string);
    this.deck = (await db.decks.get(deckId)) as Deck;
  },
  methods: {
    async handleFormSubmission(event: Event) {
      event.preventDefault();
      const formElement = this.$refs.form as HTMLFormElement;
      if (!formElement) return;

      const { question, answer } = Object.fromEntries(
        new FormData(formElement),
      );
      const cardAttributes = {
        question: question as string,
        answer: answer as string,
        deckId: this.deck!.id,
        createdAt: Date.now(),
        familarity: 0,
        reverseFamilarity: 0,
        lastReviewedAt: Date.now(),
      };
      db.cards.add(cardAttributes).then(() => {
        navigateTo(`/decks/${this.deck!.id}`);
      });
    },
  },
});
</script>

<style scoped>
nav {
  --icon: var(--white-two);
}
</style>
