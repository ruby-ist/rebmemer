<template>
  <main v-if="deck" class="p-0-20">
    <nav class="p-14-0 flex align-i-center gap-6">
      <NuxtLink to="/decks" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h2 class="m-0 color-green-one" font="w-500">{{ deck.name }}</h2>
    </nav>
    <AboutDeck :deck="deck" />
    <div class="m-20-0">
      <Button
        class="bg-color-green-one color-indigo-one w-100p p-8 pointer"
        border="none rad-10"
        font="s-1.5rem w-600 f-default-font"
      >
        Practice
      </Button>
    </div>
    <div class="flex just-c-center w-100p m-30-0-20">
      <div class="bg-color-green-two h-1 w-50p"></div>
    </div>
    <CardList />
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    deck: null as null | Deck,
  }),
  async beforeMount() {
    const id = parseInt(this.$route.params.id as string);
    this.deck = (await db.decks.get(id)) as Deck;
  },
});
</script>

<style scoped>
nav {
  --icon: var(--white-two);
}
</style>
