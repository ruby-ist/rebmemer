<template>
  <span
    @click="copyToClipBoard"
    role="button"
    tabindex="0"
    aria-label="Copy code to clipboard"
  >
    {{ content }}
  </span>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
  },

  methods: {
    async copyToClipBoard() {
      await navigator.clipboard.writeText(this.content);
    },
  },
});
</script>
