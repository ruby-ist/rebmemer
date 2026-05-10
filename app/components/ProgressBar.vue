<template>
  <div class="h-16 w-34 relative p-3" border="rad-6 1 solid color-cyan-one">
    <div class="progress-gradient h-100p w-100p" border="rad-4"></div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    progress() {
      const progress = 100 - (Math.floor(Math.random() * 100) + 1);
      return `inset(0 ${progress}% 0 0)`;
    },
  },
});
</script>

<style scoped>
.progress-gradient {
  background: linear-gradient(
    270deg,
    #8be670 0%,
    #00bd97 33.33%,
    #009db7 66.66%,
    #406db0 100%
  );
  clip-path: v-bind(progress);
}
</style>
