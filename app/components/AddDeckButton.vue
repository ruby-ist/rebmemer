<template>
  <NuxtLink to="/decks/new">
    <button
      class="h-80 w-80 p-16 absolute b-48 l-50p pointer grid place-i-center"
      border="none rad-50"
    >
      <PlusIcon class="w-44" />
    </button>
  </NuxtLink>
</template>

<style scoped>
button {
  background: #74feb2;
  transform: translateX(-50%);
}
</style>
