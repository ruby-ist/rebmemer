<template>
  <main>
    <div class="bg-color-indigo-one">
      <div
        class="grid p-20 lg:p-60-5dvw grid-columns-45%-55% grid-rows-auto lg:grid-rows-2fr-3fr grid-areas-:logo-header:-:description-description:- lg:grid-areas-:logo-header:-:logo-description:-"
      >
        <div class="grid-area-logo just-s-start lg:place-s-center">
          <img
            class="w-36dvw lg:w-28dvw max-w-600"
            border="rad-10 lg:rad-25"
            src="/logo-square.png"
            alt="rebmemer logo"
          />
        </div>
        <div class="grid-area-header ml-16 lg:ml-0">
          <h1 class="color-green-two" font="s-1.8rem lg:s-3rem w-550">
            Rebmemer
          </h1>
          <button
            class="bg-color-green-one color-indigo-one p-12-16 lg:p-14-20 pointer active:bg-color-green-two active:scale-96"
            font="f-default-font w-500 s-1rem lg:s-1.25rem"
            border="none rad-5"
          >
            Install App
          </button>
        </div>
        <div class="grid-area-description">
          <p class="lg:mt-36 lh-24" font="lg:s-1.25rem">
            Rebmemer is a mobile-first Progressive Web App designed for spaced
            repetition practice with a sleek, modern UI. Create
            question-and-answer flashcards, organize them into decks, and
            customize how cards are picked for each practice session. Flip the
            flow with reverse practice mode to review cards from answer to
            question. Easily import and export your card data via CSV. Simple,
            flexible, and designed to make spaced repetition a seamless part of
            your routine — right from your mobile device.
          </p>
        </div>
      </div>
    </div>
    <div class="p-20-0-40 lg:p-40-0-80 bg-color-blue-two">
      <h3
        class="m-0-20-20 lg:m-0-5dvw-40 color-green-one"
        font="w-500 lg:s-2rem"
      >
        Images
      </h3>
      <div
        class="p-0-20 lg:p-0-5dvw flex no-wrap gap-24 oflow-x-auto no-scrollbar"
      >
        <img
          v-for="img_num in [...Array(10).keys()].slice(1)"
          class="w-44dvw lg:w-20dvw bd-rad-5"
          :src="`/showcase/img_${img_num}.webp`"
          :alt="`Example image ${img_num}`"
        />
      </div>
    </div>
    <footer class="bg-color-indigo-one flex just-c-center align-i-center p-32">
      <i>
        Desgined and Developed by
        <a class="color-green-one" href="https://srira.me">Srira</a>
      </i>
    </footer>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    useHead({
      bodyAttrs: {
        class: "p-0",
      },
    });
  },
});
</script>
