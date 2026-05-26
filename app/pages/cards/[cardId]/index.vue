<template>
  <main v-if="card">
    <nav
      class="p-18-0 flex mb-6 just-c-space-between align-i-center relative icon-color-white-two"
    >
      <div class="flex align-i-center gap-6">
        <NuxtLink :to="`/decks/${card.deckId}`" class="flex align-i-center">
          <backIcon class="w-24 pointer" />
        </NuxtLink>
        <h1 class="m-0 color-green-one" font="w-555">
          Card <span class="color-white-two">#{{ card.id }}</span>
        </h1>
      </div>
      <Menu ref="menu">
        <NuxtLink
          :to="`/cards/${card.id}/edit`"
          class="flex align-i-center gap-14"
        >
          <editIcon class="w-18" />
          <span class="color-green-two">Edit Card</span>
        </NuxtLink>

        <a class="flex align-i-center gap-14" @click="deleteCard">
          <trashIcon class="w-18" />
          <span class="color-green-two">Delete Card</span>
        </a>
      </Menu>
    </nav>
    <div class="flex column gap-14">
      <div class="flex column gap-8 mb-12">
        <div class="color-white-three">Question:</div>
        <div class="color-green-one" font="s-1.25rem">{{ card.question }}</div>
      </div>
      <div class="flex column gap-8 mb-14">
        <div class="color-white-three">Answer:</div>
        <div class="color-green-one" font="s-1.25rem">{{ card.answer }}</div>
      </div>
      <div class="flex gap-8 align-i-center">
        <div class="color-white-three">Deck:</div>
        <div
          class="inline-block bg-color-blue-one color-green-one p-4-8"
          border="none rad-5"
          font="s-0.9rem w-500"
        >
          {{ deckName }}
        </div>
      </div>
      <div class="flex gap-8 align-i-center">
        <div class="color-white-three">Familarity:</div>
        <ProgressBar :progress="card.familarity" />
      </div>
      <div class="flex gap-8 align-i-center">
        <div class="color-white-three">Reverse Familarity:</div>
        <ProgressBar :progress="card.reverseFamilarity" />
      </div>
      <div class="flex gap-8 align-i-center">
        <div class="color-white-three">Created at:</div>
        <div font="s-0.96rem">
          {{ formatTimestamp(card.createdAt) }}
        </div>
      </div>
      <div class="flex gap-8 align-i-center">
        <div class="color-white-three">Last reviewed at:</div>
        <div font="s-0.96rem">
          {{ reviewedAtAsString(card.lastReviewedAt) }}
        </div>
      </div>
      <div class="flex gap-8 align-i-center">
        <div class="color-white-three">Last reverse reviewed at:</div>
        <div font="s-0.96rem">
          {{ reviewedAtAsString(card.lastReverseReviewedAt) }}
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import type Menu from "~/components/Menu.vue";

export default defineNuxtComponent({
  async setup() {
    const card = ref(await useCardFromParams());
    const deck = (await db.decks.get(card.value.deckId)) as Deck;
    return {
      card,
      showMenu: ref(false),
      deckName: ref(deck.name),
    };
  },
  methods: {
    async deleteCard() {
      if (confirm("Are you sure that you want to delete this card?"))
        db.cards.delete(this.card!.id).then(() => {
          navigateTo(`/decks/${this.card!.deckId}`);
        });
    },
  },
});
</script>
