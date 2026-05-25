<template>
  <div class="inline-flex relative">
    <a :aria-label="content" class="tooltip-trigger pointer inline-flex">
      <infoIcon class="tool icon-color-green-one w-16 h-16 -mb-3" />
      <span
        class="tooltip-box hidden opacity-0 absolute t-28 l-50p translate-x--50p bg-color-cyan-one color-indigo-one max-needed-width max-w-250 ta-center p-10-12 z-1"
        font="s-0.9rem"
        border="rad-4"
        style="transition: opacity 0.2s"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-24 h-24 l-50p absolute b-100p block"
          style="transform: translate(-50%, 9px)"
        >
          <path
            fill="var(--cyan-one)"
            d="m12.354 8.854 5.792 5.792a.5.5 0 0 1-.353.854H6.207a.5.5 0 0 1-.353-.854l5.792-5.792a.5.5 0 0 1 .708 0Z"
          ></path>
        </svg>
        {{ content }}
      </span>
    </a>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.tooltip-trigger:hover .tooltip-box {
  visibility: visible;
  opacity: 1;
}
</style>
