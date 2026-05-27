<template>
  <main>
    <nav class="p-18-0 flex align-i-center gap-6 icon-color-white-two">
      <a @click="$router.back()" class="flex align-i-center pointer">
        <backIcon class="w-24" />
      </a>
      <h1 class="m-0 color-green-one" font="w-555">New Deck</h1>
    </nav>
    <div class="p-10-0">
      <DeckForm :deck="newDeck" />
    </div>
  </main>
</template>

<script setup lang="ts">
const newDeck = {} as Deck;
</script>
