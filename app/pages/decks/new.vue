<template>
  <main>
    <nav class="p-14-0 flex align-i-center gap-6">
      <NuxtLink to="/decks" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h2 class="m-0 color-green-one" font="w-500">New Deck</h2>
    </nav>
    <div class="p-10-0">
      <form ref="form" class="flex column gap-20" font="s-1.15rem">
        <div>
          <label for="name" class="mb-10 block color-green-one">
            Deck Name:
          </label>

          <input
            type="text"
            id="name"
            name="name"
            class="bg-color-blue-one [&:focus]:no-outline color-white-two p-8 w-100p box-size-border-box"
            border="1 solid color-cyan-one rad-10"
            font="s-1.01rem f-default-font"
            autocomplete="off"
          />
        </div>

        <div>
          <label for="description" class="mb-10 block color-green-one">
            Description:
          </label>

          <textarea
            id="description"
            name="description"
            class="bg-color-blue-one [&:focus]:no-outline color-white-two p-8 w-100p h-144 box-size-border-box no-resize oflow-auto"
            border="1 solid color-cyan-one rad-10"
            font="s-1.01rem f-default-font"
            autocomplete="off"
          />
        </div>

        <div class="flex align-i-center gap-10">
          <label for="image" class="color-green-one"> Image: </label>

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            class="pointer font-f-default-font [&::file-selector-button]:bg-color-white-two [&::file-selector-button]:color-indigo-one [&::file-selector-button]:bd-1 [&::file-selector-button]:bd-solid [&::file-selector-button]:bd-color-indigo-one [&::file-selector-button]:font-f-default-font [&::file-selector-button]:bd-rad-5 [&::file-selector-button]:p-4-10"
          />
        </div>

        <div class="flex align-i-center gap-10">
          <label for="reversible" class="color-green-one">
            Enable reverse practice:
          </label>

          <input
            type="checkbox"
            id="reversible"
            name="reversible"
            class="bg-color-indigo-one pointer"
          />
        </div>

        <div class="flex align-i-center gap-10">
          <label for="cardsPerMatch" class="color-green-one">
            Cards to practice per session:
          </label>
          <input
            type="number"
            id="cardsPerMatch"
            name="cardsPerMatch"
            class="bg-color-blue-one [&:focus]:no-outline color-white-two p-2-6 w-72 box-size-border-box"
            border="1 solid color-cyan-one rad-5"
            font="s-1rem f-default-font"
            value="20"
          />
        </div>

        <div class="w-100p grid place-i-center">
          <input
            type="submit"
            value="Create Deck"
            class="bg-color-green-two color-indigo-one p-6-24 pointer mt-28"
            border="1px solid color-indigo-one rad-10"
            font="s-1.25rem w-500 f-default-font"
            @click="handleFormSubmission"
          />
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  methods: {
    async handleFormSubmission(event: Event) {
      event.preventDefault();
      const formElement = this.$refs.form as HTMLFormElement;
      if (!formElement) return;

      const formData = Object.fromEntries(new FormData(formElement));
      // @ts-expect-error
      if (formData.reversible) formData.reversible = true;
      // @ts-expect-error
      db.decks.add(formData).then(() => {
        navigateTo("/decks");
      });
    },
  },
});
</script>

<style scoped>
nav {
  --icon: var(--white-two);
}
</style>
