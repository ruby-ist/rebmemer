<template>
  <div>
    <div
      v-show="showNewLineButton"
      class="absolute r-12 t-12 flex align-i-center gap-4"
    >
      <button
        class="bg-color-green-two no-outline border-none pointer p-8 grid place-i-center icon-color-blue-one active:bg-color-green-one active:scale-96"
        border="rad-10"
        ref="doneButton"
        @click="addNewLine"
      >
        <enterNewLineIcon class="w-22 h-22" />
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
        enterkeyhint="go"
        class="ta-center [&:focus]:no-outline color-white-one min-h-1em min-w-1"
        font="s-1.5rem w-425 f-default-font"
        @keyup="answer = ($refs.answerInput as HTMLElement).innerText.trim()"
        @keydown.enter.prevent="handleEnter"
        @blur="handleBlur"
        @focus="showNewLineButton = true"
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
    showNewLineButton: false,
  }),
  methods: {
    addNewLine() {
      const sel = window.getSelection()!;
      const range = sel.getRangeAt(0);

      // 1. Create a fragment with a BR and a 'propper' (Zero Width Space)
      // The \u200B makes the line "exist" so the cursor can land on it
      const br = document.createElement("br");
      const textNode = document.createTextNode("\u200B");

      range.deleteContents();
      range.insertNode(textNode);
      range.insertNode(br);

      // 2. Position the cursor exactly on the TextNode after the BR
      range.setStart(textNode, 0);
      range.setEnd(textNode, 0);

      sel.removeAllRanges();
      sel.addRange(range);
    },
    handleEnter(e: Event) {
      this.$emit("checkAnswer");
      (e.target as HTMLInputElement).blur();
    },
    handleBlur() {
      const answerInput = this.$refs.answerInput as Element;
      const doneButton = this.$refs.doneButton as Element;
      setTimeout(() => {
        if (
          ![answerInput, answerInput.parentElement, doneButton].includes(
            document.activeElement,
          )
        )
          this.showNewLineButton = false;
      }, 50);
    },
    clearAnswer() {
      this.answer = "";
      (this.$refs.answerInput as HTMLElement).innerText = "";
    },
  },
});
</script>
