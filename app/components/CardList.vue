<template>
  <div>
    <div class="cards flex align-i-center just-c-space-between mb-8">
      <h2 class="m-0 color-cyan-one">Cards</h2>
      <NuxtLink :to="`/decks/5/cards/new`">
        <PlusIcon class="w-36 pointer" />
      </NuxtLink>
    </div>
    <div class="mb-20" font="w-500">
      <label>Sort by&ensp;</label>
      <select
        class="bg-color-blue-one p-4 color-cyan-one no-outline"
        border="none rad-5"
        font="s-1rem w-500 f-default-font"
      >
        <option value="name">Alphabetic</option>
        <option value="familarity">Familarity</option>
        <option value="last_practiced_at">Last Practiced</option>
        <option value="created_at">Created Date</option>
      </select>
    </div>
    <div
      class="bg-color-blue-one flex column p-0-16"
      border="2 solid color-cyan-one rad-16"
      font="s-1.1rem w-500"
    >
      <div class="p-16-0" border="b-2 b-solid b-color-cyan-one">
        <div>Water</div>
        <div class="color-white-one">水</div>
      </div>

      <div class="p-16-0" border="b-1 b-solid b-color-cyan-one">
        <div>Tea</div>
        <div class="color-white-one">お茶</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards {
  --icon: var(--cyan-one);
}
</style>
