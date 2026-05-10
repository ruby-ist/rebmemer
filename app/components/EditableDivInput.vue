<template>
  <div>
    <div
      v-show="answer.length !== 0 && showDoneButton"
      class="absolute r-12 t-12 flex align-i-center gap-4"
    >
      <button
        class="bg-color-green-two no-bg no-outline border-none pointer p-2-4 icon-color-green-two"
        border="rad-10"
        ref="doneButton"
        @click="handleDone"
      >
        <doneIcon class="w-32 h-32" />
      </button>
    </div>
    <div
      class="grid place-i-center bg-color-blue-one p-24-12 w-100p h-[calc(100vw-40px)] box-size-border-box oflow-auto"
      border="1 solid color-cyan-one rad-20"
      @click="($refs.answerInput as HTMLElement).focus()"
      tabindex="0"
    >
      <div
        contenteditable="true"
        ref="answerInput"
        class="ta-center [&:focus]:no-outline color-white-one min-h-1em min-w-1"
        font="s-1.5rem w-425 f-default-font"
        @keyup="answer = ($refs.answerInput as HTMLElement).innerText.trim()"
        @blur="handleBlur"
        @focus="showDoneButton = true"
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
  emits: ["checkAnswer"],
  data: () => ({
    answer: "",
    showDoneButton: false,
  }),
  methods: {
    handleDone() {
      this.$emit("checkAnswer");
      this.showDoneButton = false;
    },
    handleBlur(e: FocusEvent) {
      const answerInput = this.$refs.answerInput as Element;
      const doneButton = this.$refs.doneButton as Element;
      setTimeout(() => {
        if (
          ![answerInput, answerInput.parentElement, doneButton].includes(
            document.activeElement,
          )
        )
          this.showDoneButton = false;
      }, 100);
    },
    clearAnswer() {
      this.answer = "";
      (this.$refs.answerInput as HTMLElement).innerText = "";
    },
  },
});
</script>
