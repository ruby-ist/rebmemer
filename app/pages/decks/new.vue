<template>
  <main>
    <nav class="p-18-0 flex align-i-center gap-6 icon-color-white-two">
      <NuxtLink to="/decks" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h1 class="m-0 color-green-one" font="w-555">New Deck</h1>
    </nav>
    <div class="p-10-0">
      <DeckForm :deck="{} as Deck" />
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
      db.decks.add(formData).then(() => {
        navigateTo("/decks");
      });
    },
  },
});
</script>
