<template>
  <div ref="menuDiv">
    <button
      class="no-bg no-outline border-none relative z-2"
      @click="showMenu = true"
      v-show="!showMenu"
    >
      <threeBarsIcon class="w-24 pointer" />
    </button>
    <GSAPTransition
      :hidden="{
        scale: 0.1,
        duration: 0.1,
        opacity: 0,
        transformOrigin: 'top right',
        ease: 'sine.out',
      }"
    >
      <div
        v-if="showMenu"
        class="absolute bg-color-blue-one p-16-14-20 z-2 flex column gap-24 -r-0 t-18 pointer"
        border="1 solid color-cyan-one rad-10"
        font="s-1.2rem"
        style="box-shadow: 0 0 100px 50px var(--indigo-one)"
        v-gsap.stagger.from="{
          scale: 0,
          transformOrigin: 'center left',
          stagger: { each: 0.1 },
        }"
      >
        <slot />
      </div>
    </GSAPTransition>
  </div>
  <div
    v-if="showMenu"
    @click="showMenu = false"
    class="absolute z-1 h-100dvh w-100dvw t-0 -l-20"
    style="touch-action: none"
  ></div>
</template>

<script setup lang="ts">
const showMenu = ref(false);
</script>
