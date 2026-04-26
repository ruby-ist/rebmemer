<template>
  <main>
    <nav class="p-14-20">
      <h1 class="m-0" font="w-800">Decks</h1>
    </nav>
    <div class="p-10-20-100 flex wrap row gap-20-8p">
      <Deck v-for="deck in decks" :key="deck.id" :deck="deck" />
    </div>
    <AddDeckButton />
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    decks: [] as globalThis.Deck[],
  }),
  async mounted() {
    this.decks = await db.decks.toArray();
  },
});
</script>
