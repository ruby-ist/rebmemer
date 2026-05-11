<template>
  <main>
    <nav class="p-18-0 flex align-i-center gap-6 icon-color-white-two">
      <NuxtLink :to="`/decks/${deck.id}`" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h2 class="m-0 color-green-one" font="w-600">Edit Deck</h2>
    </nav>
    <div class="p-10-0">
      <DeckForm :deck="deck" />
    </div>
  </main>
</template>

<script setup lang="ts">
const deck = ref(await useDeckFromParams());
</script>
