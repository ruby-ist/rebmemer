<template>
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
        required
        :value="card.question || ''"
      />
    </div>

    <div>
      <label for="answer" class="mb-10 block color-white-two"> Answer: </label>

      <textarea
        id="answer"
        name="answer"
        class="bg-color-blue-one [&:focus]:no-outline color-green-two p-12 w-100p h-144 box-size-border-box no-resize oflow-auto"
        border="1 solid color-cyan-one rad-10"
        font="s-1.15rem w-425 f-default-font"
        autocomplete="off"
        required
        :value="card.answer || ''"
      />
    </div>

    <div class="w-100p grid place-i-center">
      <input
        type="submit"
        :value="card.id ? 'Update Card' : 'Create Card'"
        class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28"
        border="1px solid color-indigo-one rad-10"
        font="s-1.35rem w-475 f-default-font"
        @click="handleFormSubmission"
      />
    </div>
  </form>
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
  methods: {
    handleFormSubmission(event: Event) {
      event.preventDefault();
      const formElement = this.$refs.form as HTMLFormElement;
      if (!formElement.reportValidity()) return;

      const { question, answer } = this.getQuestionAndAnswer(formElement);
      const card = this.card.id ? Object.assign({}, this.card) : this.newCard();
      card.question = question;
      card.answer = answer;

      this.card.id ? this.updateCard(card) : this.createCard(card);
    },

    getQuestionAndAnswer(form: HTMLFormElement) {
      const { question, answer } = Object.fromEntries(new FormData(form)) as {
        question: string;
        answer: string;
      };
      return { question, answer };
    },

    createCard(card: Card) {
      db.cards.add(card).then(() => {
        navigateTo(`/decks/${this.deck!.id}`);
      });
    },

    updateCard(card: Card) {
      db.cards.put(card).then(() => {
        navigateTo(`/decks/${this.deck!.id}`);
      });
    },

    newCard() {
      return {
        question: "",
        answer: "",
        deckId: this.deck!.id,
        createdAt: Date.now(),
        familarity: 0,
        reverseFamilarity: 0,
        lastReviewedAt: Date.now(),
        lastReverseReviewedAt: Date.now(),
      } as Card;
    },
  },
});
</script>
