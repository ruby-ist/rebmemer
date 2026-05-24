<template>
  <main>
    <nav class="p-18-0 flex align-i-center gap-6 icon-color-white-two">
      <NuxtLink :to="`/decks/${deck.id}`" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h1 class="m-0 color-green-one" font="w-555">Edit Deck</h1>
    </nav>
    <div class="p-10-0">
      <DeckForm :deck="deck" />
    </div>
  </main>
</template>

<script setup lang="ts">
const deck = ref(await useDeckFromParams());
</script>
