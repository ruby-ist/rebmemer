<template>
  <div>Wait for redirection...</div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  created() {
    navigateTo("/decks");
  },
});
</script>
