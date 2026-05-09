<template>
  <main v-if="deck" @click="hideMenu" class="pb-80">
    <nav
      class="p-18-0 flex just-c-space-between align-i-center relative icon-color-white-two"
    >
      <div class="flex align-i-center gap-6">
        <NuxtLink to="/decks" class="flex align-i-center">
          <backIcon class="w-24 pointer" />
        </NuxtLink>
        <h1 class="m-0 color-green-one" font="w-555">{{ deck.name }}</h1>
      </div>
      <Menu ref="menu">
        <NuxtLink
          :to="`/decks/${deck.id}/edit`"
          class="flex align-i-center gap-8"
        >
          <editIcon class="w-18" />
          <span class="color-green-two">Edit Deck</span>
        </NuxtLink>

        <a class="flex align-i-center gap-8" @click="deleteDeck">
          <trashIcon class="w-18" />
          <span class="color-green-two">Delete Deck </span>
        </a>
        <div class="flex align-i-center gap-8">
          <flipIcon class="w-18" />
          <span class="color-green-two">Flip the cards</span>
        </div>
      </Menu>
    </nav>
    <AboutDeck
      :deck="deck"
      :cardCount="cards.length"
      :lastPracticedAt="lastPracticedAt"
    />
    <NuxtLink :to="`/decks/${deck.id}/practice`" class="block m-20-0">
      <button
        class="bg-color-green-one color-indigo-one w-100p p-10 pointer"
        border="none rad-10"
        font="s-1.5rem w-475 f-default-font"
      >
        Practice
      </button>
    </NuxtLink>
    <div class="flex just-c-center w-100p m-30-0-20">
      <div class="bg-color-cyan-one h-1 w-50p"></div>
    </div>
    <CardList :deck="deck" :cards="cards" />
  </main>
</template>

<script lang="ts">
import type Menu from "~/components/Menu.vue";

export default defineNuxtComponent({
  data: () => ({
    deck: null as null | Deck,
    cards: [] as Card[],
  }),
  async beforeMount() {
    const deckId = parseInt(this.$route.params.deckId as string);
    this.deck = (await db.decks.get(deckId)) as Deck;
    this.cards = await db.cards.where("deckId").equals(this.deck!.id).toArray();
  },
  computed: {
    lastPracticedAt() {
      const lastPracticedCard = this.cards.sort(
        (a, b) => b.lastReviewedAt - a.lastReviewedAt,
      )[0];
      return lastPracticedCard ? lastPracticedCard.lastReviewedAt : null;
    },
  },
  methods: {
    hideMenu(e: Event) {
      (this.$refs.menu as InstanceType<typeof Menu>).hideMenu(e);
    },

    deleteDeck() {
      if (
        confirm(
          "Current deck and all of its cards will be permanently deleted. Are you sure?",
        )
      )
        db.cards
          .where("deckId")
          .equals(this.deck!.id)
          .delete()
          .then(() => {
            db.decks.delete(this.deck!.id).then(() => {
              navigateTo("/decks");
            });
          });
    },
  },
});
</script>
