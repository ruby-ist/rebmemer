<template>
  <div ref="menuDiv">
    <button class="no-bg no-outline border-none" @click="showMenu = true">
      <threeBarsIcon class="w-24 pointer" />
    </button>
    <div
      v-show="showMenu"
      class="absolute bg-color-blue-one p-16-20-24 flex column gap-24 -r-0 t-18 pointer"
      border="1 solid color-cyan-one rad-10"
      font="s-1.2rem"
      style="box-shadow: 0 0 100px 50px var(--indigo-one)"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    showMenu: false,
  }),
  methods: {
    hideMenu(e: Event) {
      if (
        !(this.$refs.menuDiv as HTMLElement)?.contains(e.target as HTMLElement)
      )
        this.showMenu = false;
    },
  },
});
</script>
