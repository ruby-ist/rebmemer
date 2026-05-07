<template>
  <div>
    <div v-show="showKeyboardDownButton" class="absolute r-16 t-12">
      <button
        class="bg-color-green-two no-bg no-outline border-none pointer p-2-4 icon-color-green-two"
        border="rad-10"
        @click="blurAnwerInput"
      >
        <keyboardDownIcon class="w-28 h-28" />
      </button>
    </div>
    <div
      class="grid place-i-center bg-color-blue-one p-24-12 w-100p h-[calc(100vw-40px)] box-size-border-box oflow-auto"
      border="1 solid color-cyan-one rad-20"
      @click="($refs.answerInput as HTMLElement).focus()"
    >
      <div
        contenteditable="true"
        ref="answerInput"
        class="ta-center [&:focus]:no-outline color-white-one min-h-1em min-w-1"
        font="s-1.5rem w-425 f-default-font"
        @keyup="answer = ($refs.answerInput as HTMLElement).innerText.trim()"
        @blur="showKeyboardDownButton = false"
        @focus="showKeyboardDownButton = true"
      ></div>
      <span
        v-show="answer.length === 0"
        class="absolute color-white-three z-0"
        font="s-1.5rem"
      >
        Type Here
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    answer: "",
    showKeyboardDownButton: false,
  }),
  methods: {
    blurAnwerInput() {
      const answerInput = this.$refs.answerInput as HTMLElement;
      answerInput.blur();
    },
  },
});
</script>
