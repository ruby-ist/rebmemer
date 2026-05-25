<template>
  <form ref="form" class="flex column gap-18 pb-80" font="s-1.15rem">
    <div>
      <label for="name" class="mb-10 block color-white-two"> Deck Name: </label>

      <input
        type="text"
        id="name"
        name="name"
        class="bg-color-blue-one [&:focus]:no-outline color-green-two p-12 w-100p box-size-border-box"
        border="1 solid color-cyan-one rad-10"
        font="s-1.15rem w-425 f-default-font"
        autocomplete="off"
        required
        v-model="deck.name"
      />
    </div>

    <div>
      <label for="description" class="mb-10 block color-white-two">
        Description:
      </label>

      <textarea
        id="description"
        name="description"
        class="bg-color-blue-one [&:focus]:no-outline color-green-two p-12 w-100p h-144 box-size-border-box no-resize oflow-auto"
        border="1 solid color-cyan-one rad-10"
        font="s-1.15rem w-425 f-default-font"
        autocomplete="off"
        required
        v-model="deck.description"
      />
    </div>

    <div class="flex align-i-center gap-10">
      <label for="image" class="color-white-two"> Image: </label>

      <div
        v-if="deck.image && !showFileInput"
        class="flex align-i-center gap-5 color-green-two"
      >
        <button
          class="bg-color-white-two color-indigo-one p-4-10"
          border="1 solid color-indigo-one rad-5"
          font="f-default-font"
          @click="browseImage"
        >
          Browse...
        </button>
        <span ref="fileName" font="s-0.83rem">{{
          shrinkFileName((deck.image as File).name)
        }}</span>
      </div>
      <input
        v-show="!deck.image || showFileInput"
        ref="fileInput"
        type="file"
        id="image"
        name="image"
        accept="image/*"
        :required="!deck.image || showFileInput"
        class="pointer w-75p color-green-two font-f-default-font [&::file-selector-button]:bg-color-white-two [&::file-selector-button]:color-indigo-one [&::file-selector-button]:bd-1 [&::file-selector-button]:bd-solid [&::file-selector-button]:bd-color-indigo-one [&::file-selector-button]:font-f-default-font [&::file-selector-button]:bd-rad-5 [&::file-selector-button]:p-4-10"
      />
    </div>

    <a
      class="color-green-two flex align-i-center gap-4 pointer"
      v-show="!showLearningSettings"
      @click="openLearningSettings"
    >
      <ChevronIcon class="icon-color-white-two w-16" />
      <span>Learning Settings</span>
    </a>
    <fieldset border="color-green-two rad-15" v-show="showLearningSettings">
      <legend class="color-green-two" @click="showLearningSettings = false">
        Learning Settings
      </legend>
      <div class="flex column gap-12 learning-settings">
        <div class="flex align-i-center just-c-space-between gap-10">
          <div class="flex align-i-center gap-4">
            <label for="cardsPerRound" class="color-white-two">
              Cards per practice:
            </label>
            <InfoTooltip content="Number of cards to practice per session." />
          </div>
          <div>
            <input
              type="number"
              id="cardsPerRound"
              name="cardsPerRound"
              class="bg-color-blue-one [&:focus]:no-outline color-green-two p-2-6 w-72 box-size-border-box"
              border="1 solid color-cyan-one rad-5"
              font="s-1.1rem f-default-font"
              required
              min="1"
              :value="deck.cardsPerRound || 20"
            />
            <span class="ml-6 opacity-0">%</span>
          </div>
        </div>

        <div class="flex align-i-center just-c-space-between gap-10">
          <div class="flex align-i-center gap-4">
            <label for="retentionExpansionBase" class="color-white-two">
              Review interval scaling:
            </label>
            <InfoTooltip
              content="Adjusts review frequency. Higher = longer breaks between words you know well (faster pacing). Lower = shorter breaks (safer, high-repetition pacing)."
            />
          </div>
          <div>
            <input
              type="number"
              id="retentionExpansionBase"
              name="retentionExpansionBase"
              class="bg-color-blue-one [&:focus]:no-outline color-green-two p-2-6 w-72 box-size-border-box"
              border="1 solid color-cyan-one rad-5"
              font="s-1.1rem f-default-font"
              required
              min="1.2"
              step="0.1"
              :value="deck.retentionExpansionBase || 1.5"
            />
            <span class="ml-6 opacity-0">%</span>
          </div>
        </div>

        <div class="flex align-i-center just-c-space-between gap-10">
          <div class="flex align-i-center gap-4">
            <label for="correctAnswerLeap" class="color-white-two">
              Familarity leap:
            </label>
            <InfoTooltip
              content="Controls how quickly new words climb toward mastery when answered correctly. Higher percentages accelerate your progress so you see successful words less often. Lower percentages keep them in the short-term loop longer to ensure they stick."
            />
          </div>
          <div>
            <input
              type="number"
              id="correctAnswerLeap"
              name="correctAnswerLeap"
              class="bg-color-blue-one [&:focus]:no-outline color-green-two p-2-6 w-72 box-size-border-box"
              border="1 solid color-cyan-one rad-5"
              font="s-1.1rem f-default-font"
              required
              min="1"
              :value="deck.correctAnswerLeap || 20"
            />
            <span class="ml-6">%</span>
          </div>
        </div>

        <div class="flex align-i-center just-c-space-between gap-10">
          <div class="flex align-i-center gap-4">
            <label for="partialAnswerPenalty" class="color-white-two">
              Partial penalty:
            </label>
            <InfoTooltip
              content="The memory tax applied when you answer paritally with struggling, guessing or took a long time to recall. This pulls the word back slightly in rotation so it gets reinforced sooner."
            />
          </div>
          <div>
            <input
              type="number"
              id="partialAnswerPenalty"
              name="partialAnswerPenalty"
              class="bg-color-blue-one [&:focus]:no-outline color-green-two p-2-6 w-72 box-size-border-box"
              border="1 solid color-cyan-one rad-5"
              font="s-1.1rem f-default-font"
              required
              min="1"
              :value="deck.partialAnswerPenalty || 15"
            />
            <span class="ml-6">%</span>
          </div>
        </div>

        <div class="flex align-i-center just-c-space-between gap-10">
          <div class="flex align-i-center gap-4">
            <label for="wrongAnswerPenalty" class="color-white-two">
              Wrong penalty:
            </label>
            <InfoTooltip
              content="The standard penalty applied when you give an incorrect answer using an invalid reading, or mixing up vocabulary. It steps your progress back significantly to ensure the word is retested soon."
            />
          </div>
          <div>
            <input
              type="number"
              id="wrongAnswerPenalty"
              name="wrongAnswerPenalty"
              class="bg-color-blue-one [&:focus]:no-outline color-green-two p-2-6 w-72 box-size-border-box"
              border="1 solid color-cyan-one rad-5"
              font="s-1.1rem f-default-font"
              required
              min="1"
              :value="deck.wrongAnswerPenalty || 35"
            />
            <span class="ml-6">%</span>
          </div>
        </div>

        <div class="flex align-i-center just-c-space-between gap-10">
          <div class="flex align-i-center gap-4">
            <label for="forgottenAnswerPenalty" class="color-white-two">
              Forgotten penalty:
            </label>
            <InfoTooltip
              content="The heavy penalty applied when you draw an absolute blank and have zero recognition of the word. This aggressively drops its familiarity back toward beginner status, surging its urgency so you can relearn it immediately."
            />
          </div>
          <div>
            <input
              type="number"
              id="forgottenAnswerPenalty"
              name="forgottenAnswerPenalty"
              class="bg-color-blue-one [&:focus]:no-outline color-green-two p-2-6 w-72 box-size-border-box"
              border="1 solid color-cyan-one rad-5"
              font="s-1.1rem f-default-font"
              required
              min="1"
              :value="deck.forgottenAnswerPenalty || 90"
            />
            <span class="ml-6">%</span>
          </div>
        </div>

        <div class="flex align-i-center just-c-space-between gap-10">
          <div class="flex align-i-center gap-4">
            <label for="newCardsRatio" class="color-white-two">
              New cards Ratio:
            </label>
            <InfoTooltip
              content="Controls the balance of your review queue. This percentage dictates how much of your session is dedicated to introducing brand-new words versus reviewing older ones."
            />
          </div>
          <div>
            <input
              type="number"
              id="newCardsRatio"
              name="newCardsRatio"
              class="bg-color-blue-one [&:focus]:no-outline color-green-two p-2-6 w-72 box-size-border-box"
              border="1 solid color-cyan-one rad-5"
              font="s-1.1rem f-default-font"
              required
              min="1"
              :value="deck.newCardsRatio || 50"
            />
            <span class="ml-6">%</span>
          </div>
        </div>
      </div>
    </fieldset>

    <div class="w-100p grid place-i-center">
      <input
        type="submit"
        :value="deck.id ? 'Update Deck' : 'Create Deck'"
        class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28 active:bg-color-green-one active:scale-96"
        border="1px solid color-indigo-one rad-10"
        font="s-1.35rem w-475 f-default-font"
        @click="handleFormSubmission"
      />
    </div>
  </form>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    deck: {
      type: Object as PropType<Deck>,
      required: true,
    },
  },
  data: () => ({
    showFileInput: false,
    showLearningSettings: false,
  }),
  methods: {
    async handleFormSubmission(event: Event) {
      event.preventDefault();
      const formElement = this.$refs.form as HTMLFormElement;
      if (!formElement.reportValidity()) return;

      const formData = Object.fromEntries(
        new FormData(formElement),
      ) as unknown as Deck;

      try {
        if (this.deck.id) {
          this.checkImageAndAddId(formData);
          await db.decks.put(formData);
          navigateTo(`/decks/${this.deck.id}`);
        } else {
          await db.decks.add(formData);
          navigateTo("/decks");
        }
      } catch (e) {
        alert("a Deck with the same name already exists!");
      }
    },

    browseImage(e: Event) {
      e.preventDefault();
      const fileInput = this.$refs.fileInput as HTMLInputElement;
      fileInput.click();
      this.showFileInput = true;
    },

    checkImageAndAddId(deck: Deck) {
      if ((deck.image as File).name === "") deck.image = this.deck.image;
      deck.id = this.deck.id;
    },

    shrinkFileName(fileName: string, maxLength = 25) {
      if (fileName.length <= maxLength) return fileName;

      const extIndex = fileName.lastIndexOf(".");
      const hasExtension = extIndex !== -1;

      const extension = hasExtension ? fileName.slice(extIndex) : "";
      const namePart = hasExtension ? fileName.slice(0, extIndex) : fileName;

      const ellipsis = "...";

      // Space left for name (excluding extension and ellipsis)
      const available = maxLength - extension.length - ellipsis.length;

      if (available <= 0) {
        // fallback: just truncate brutally
        return fileName.slice(0, maxLength - ellipsis.length) + ellipsis;
      }

      const front = Math.ceil(available / 2);
      const back = Math.floor(available / 2);

      return (
        namePart.slice(0, front) +
        ellipsis +
        namePart.slice(namePart.length - back) +
        extension
      );
    },

    openLearningSettings() {
      this.showLearningSettings = true;
      gsap.from("fieldset", {
        height: 0,
        duration: 0.5,
        transformOrigin: "top center",
        ease: "sine.out",
      });
      gsap.from(".learning-settings > div", {
        opacity: 0,
        duration: 0.4,
        ease: "sine.inOut",
        stagger: {
          each: 0.1,
        },
      });
    },
  },
});
</script>
