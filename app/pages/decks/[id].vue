<template>
  <main v-if="deck" class="p-0-20">
    <nav class="p-14-0 flex align-i-center gap-6">
      <NuxtLink to="/decks" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h2 class="m-0 color-green-one" font="w-500">{{ deck.name }}</h2>
    </nav>
    <div class="color-white-three p-4-0 flex column gap-8">
      <div>
        <h4 class="m-0">Description:</h4>
        <div>{{ deck.description }}</div>
      </div>
      <div class="flex row gap-4">
        <h4 class="m-0">Count:</h4>
        <div>{{ 230 }}</div>
      </div>
      <div class="flex row gap-4">
        <h4 class="m-0">Last practiced:</h4>
        <div>12 Mar, 2026 | 12:34</div>
      </div>
    </div>
    <div class="m-20-0">
      <Button
        class="bg-color-green-one color-indigo-one w-100p p-8 pointer"
        border="none rad-10"
        font="s-1.5rem w-600 f-default-font"
      >
        Practice
      </Button>
    </div>
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
