<template>
  <main>
    <nav class="p-14-20 flex align-i-center gap-6">
      <NuxtLink to="/decks" class="flex align-i-center">
        <backIcon class="w-28" />
      </NuxtLink>
      <h1 class="m-0 color-green-one" font="w-800">Create Deck</h1>
    </nav>
    <div class="p-10-20">
      <form ref="form">
        <label for="name">Name:</label><br />

        <input type="text" id="name" name="name" /><br /><br />

        <label for="description">Description:</label><br />

        <textarea id="description" name="description" /><br /><br />

        <label for="image">Image:</label><br />

        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
        /><br /><br />

        <label for="reversible">Reversible:</label>

        <input type="checkbox" id="reversible" name="reversible" /><br /><br />

        <label for="cardsPerMatch">Cards Per Match:</label><br />

        <input
          type="number"
          id="cardsPerMatch"
          name="cardsPerMatch"
        /><br /><br />

        <input type="submit" value="Submit" @click="handleFormSubmission" />
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
