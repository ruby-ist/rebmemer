<template>
  <main v-if="card" @click="hideMenu">
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
          class="flex align-i-center gap-8"
        >
          <editIcon class="w-18" />
          <span class="color-green-two">Edit Card</span>
        </NuxtLink>

        <a class="flex align-i-center gap-8" @click="deleteCard">
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
        <ProgressBar />
      </div>
      <div class="flex gap-8 align-i-center">
        <div class="color-white-three">Created at:</div>
        <div font="s-0.96rem">
          {{ new Date(card.createdAt).toLocaleString() }}
        </div>
      </div>
      <div class="flex gap-8 align-i-center">
        <div class="color-white-three">Last reviewed at:</div>
        <div font="s-0.96rem">
          {{ new Date(card.lastReviewedAt).toLocaleString() }}
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import type Menu from "~/components/Menu.vue";

export default defineNuxtComponent({
  data: () => ({
    card: null as Card | null,
    showMenu: false,
    deckName: "",
  }),
  async beforeMount() {
    const cardId = parseInt(this.$route.params.cardId as string);
    this.card = (await db.cards.get(cardId)) as Card;
    db.decks.get(this.card.deckId).then((deck) => {
      this.deckName = deck!.name;
    });
  },
  methods: {
    hideMenu(e: Event) {
      (this.$refs.menu as InstanceType<typeof Menu>).hideMenu(e);
    },
    async deleteCard() {
      if (confirm("Are you sure that you want to delete this card?"))
        db.cards.delete(this.card!.id).then(() => {
          navigateTo(`/decks/${this.card!.deckId}`);
        });
    },
  },
});
</script>
