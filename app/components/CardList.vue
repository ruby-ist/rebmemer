<template>
  <div class="icon-color-green-two min-h-98dvh">
    <div class="flex align-i-center just-c-space-between mb-10">
      <h2 class="m-0 color-green-two" font="w-475">Cards</h2>
      <NuxtLink :to="`/decks/${deck.id}/cards/new`">
        <PlusIcon class="w-36 pointer" />
      </NuxtLink>
    </div>
    <div class="mb-16">
      <input
        type="search"
        id="name"
        v-model="search"
        name="name"
        @focus="moveSearchBarToTop"
        class="bg-color-blue-one [&:focus]:no-outline color-green-two [&::placeholder]:opacity-0.9 [&::placeholder]:color-green-one p-12 w-100p box-size-border-box"
        border="1 solid color-cyan-one rad-10"
        font="s-1.15rem w-425 f-default-font"
        autocomplete="off"
        spellcheck="false"
        placeholder="Search..."
      />
    </div>
    <div class="mb-20 flex align-i-center gap-8" font="w-450">
      <label>Sort by</label>
      <select
        class="bg-color-blue-one p-4 color-green-two no-outline ta-center field-sizing-content"
        border="none rad-5"
        font="s-1rem w-450 f-default-font"
        v-model="sortByKey"
      >
        <option value="question">Question</option>
        <option value="answer">Answer</option>
        <option :value="deck.reversed ? 'reverseFamilarity' : 'familarity'">
          Familarity
        </option>
        <option
          :value="deck.reversed ? 'lastReverseReviewedAt' : 'lastReviewedAt'"
        >
          Last Practiced
        </option>
        <option value="createdAt">Created Date</option>
      </select>
      <button
        @click="sortByAsc = !sortByAsc"
        class="no-bg no-outline"
        border="none"
        style="--icon: var(--cyan-one)"
      >
        <ascendingSortIcon class="w-24" v-if="sortByAsc" />
        <descendingSortIcon class="w-24" v-else />
      </button>
    </div>
    <div
      v-if="sortedCards.length !== 0"
      class="flex column p-0-16"
      border="1 solid color-cyan-one rad-16"
      font="s-1.1rem w-500"
    >
      <Card
        v-for="card in sortedCards.slice(0, cardLimit)"
        :key="card.id"
        :card="card"
        class="[&:last-child]:border-none"
        :reversed="deck.reversed"
      />
    </div>
    <div
      v-else
      class="bg-color-blue-one flex column p-48-24 ta-center"
      border="rad-16"
      font="s-1.1rem"
    >
      No Cards Found!
    </div>
    <button
      @click="scrollToTop"
      v-if="showScrollButton"
      class="fixed t-86dvh r-16 bg-color-green-two p-16 grid place-i-center pointer active:bg-color-green-one active:scale-96"
      border="none rad-50"
    >
      <MoveToTopIcon class="icon-color-indigo-one w-28 h-28" />
    </button>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    deck: {
      type: Object as PropType<Deck>,
      required: true,
    },
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
  },
  data: () => ({
    sortByKey: "createdAt",
    sortByAsc: true,
    cardLimit: 100,
    search: "",
    showScrollButton: false,
  }),
  computed: {
    sortedCards(): Card[] {
      return this.filteredCards.sort((cardOne, cardTwo) => {
        // @ts-expect-error
        const valueOne = cardOne[this.sortByKey];
        // @ts-expect-error
        const valueTwo = cardTwo[this.sortByKey];

        if (typeof valueOne === "string") {
          return this.sortByAsc
            ? valueOne.localeCompare(valueTwo)
            : valueTwo.localeCompare(valueOne);
        }

        return this.sortByAsc ? valueOne - valueTwo : valueTwo - valueOne;
      });
    },
    filteredCards() {
      if (!this.search) return [...this.cards];

      return [...this.cards].filter((card) => {
        return (
          card.question.toLowerCase().includes(this.search.toLowerCase()) ||
          card.answer.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    scrollEvent() {
      const body = document.body;
      if (
        body.scrollTop + 2000 > body.scrollHeight &&
        this.cardLimit < this.sortedCards.length
      )
        this.cardLimit += 100;

      this.showScrollButton = body.scrollTop > 290 ? true : false;
    },
    scrollToTop() {
      document.body.scrollTo({ top: 0, behavior: "smooth" });
    },
    moveSearchBarToTop() {
      const threshold = 5;
      if (document.body.scrollTop > 290 - threshold) return;

      document.body.scrollTo({ top: 290, behavior: "smooth" });
    },
  },
  mounted() {
    this.sortByKey = localStorage.getItem("sortByKey") || "createdAt";
    this.sortByAsc = JSON.parse(localStorage.getItem("sortByAsc") || "true");
    document.body.addEventListener("scroll", this.scrollEvent);
    document.body.scrollTo({ top: 0, behavior: "auto" });
  },
  beforeUnmount() {
    document.body.removeEventListener("scroll", this.scrollEvent);
  },
  watch: {
    search(newValue, oldValue) {
      if (oldValue.length < newValue.length) {
        this.moveSearchBarToTop();
      }
    },
    deck(newValue) {
      if (newValue.reversed) {
        if (this.sortByKey === "familarity")
          this.sortByKey = "reverseFamilarity";
        else if (this.sortByKey === "lastReviewedAt")
          this.sortByKey = "lastReverseReviewedAt";
      } else {
        if (this.sortByKey === "reverseFamilarity")
          this.sortByKey = "familarity";
        else if (this.sortByKey === "lastReverseReviewedAt")
          this.sortByKey = "lastReviewedAt";
      }
    },
    sortByKey(newValue) {
      localStorage.setItem("sortByKey", newValue);
    },
    sortByAsc(newValue) {
      localStorage.setItem("sortByAsc", newValue ? "true" : "false");
    },
  },
});
</script>
