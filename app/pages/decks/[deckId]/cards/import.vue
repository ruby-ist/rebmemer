<template>
  <main v-if="deck">
    <nav class="p-18-0 flex align-i-center gap-6 icon-color-white-two">
      <a @click="$router.back()" class="flex align-i-center pointer">
        <backIcon class="w-24" />
      </a>
      <h1 class="m-0 color-green-one" font="w-555">Import Cards</h1>
    </nav>
    <div class="mt-20 flex column gap-20">
      <div class="flex column gap-12">
        <label for="image" class="mb-10 block color-white-two" font="s-1.2rem">
          Choose File:
        </label>
        <input
          ref="fileInput"
          type="file"
          accept=".csv, text/csv"
          @change="handleFileChange"
          class="pointer color-green-two font-f-default-font [&::file-selector-button]:bg-color-white-two [&::file-selector-button]:color-indigo-one [&::file-selector-button]:bd-1 [&::file-selector-button]:bd-solid [&::file-selector-button]:bd-color-indigo-one [&::file-selector-button]:font-f-default-font [&::file-selector-button]:bd-rad-5 [&::file-selector-button]:p-4-10"
        />
      </div>
      <div class="grid place-i-center">
        <button
          @click="importCards"
          class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28 active:bg-color-green-one active:scale-96"
          border="1px solid color-indigo-one rad-10"
          font="s-1.35rem w-475 f-default-font"
        >
          Import
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default defineNuxtComponent({
  async setup() {
    const deck = ref(await useDeckFromParams());
    return { deck };
  },
  data: () => ({
    file: null as File | null,
  }),
  methods: {
    handleFileChange(e: Event) {
      const inputElement = e.target as HTMLInputElement;
      this.file = inputElement.files![0] as File;
    },

    async importCards() {
      try {
        if (!this.file) return;

        const content = await this.readFile(this.file);
        const data = this.parseCSVContent(content);
        data.shift();

        const cards = data.map((row) => this.convertRowToCard(row));
        await db.cards.bulkAdd(cards);
        this.$router.back();
      } catch (e) {
        alert(e);
      }
    },

    readFile(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          } else {
            reject(new Error("Failed to read the file"));
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    },

    parseCSVContent(csvContent: string): string[][] {
      return csvContent
        .split("\n")
        .filter((row) => row.trim() !== "")
        .map((row) => row.split("|").map((column) => column.trim()));
    },

    convertRowToCard(row: string[]): Card {
      if (row.length !== 6) {
        throw new Error(`Invalid row format: ${row}`);
      }

      const [
        question,
        answer,
        familarity,
        lastReviewedAt,
        reverseFamilarity,
        lastReverseReviewedAt,
      ] = row as [string, string, string, string, string, string];
      const card = {
        question,
        answer,
        familarity: parseFloat(familarity || "0"),
        lastReviewedAt: lastReviewedAt ? Date.parse(lastReviewedAt) : 0,
        reverseFamilarity: parseFloat(reverseFamilarity || "0"),
        lastReverseReviewedAt: lastReverseReviewedAt
          ? Date.parse(lastReverseReviewedAt)
          : 0,
        createdAt: Date.now(),
        deckId: this.deck.id,
      } as unknown as Card;

      if (
        Object.values(card).some((value) => {
          Number.isNaN(value);
        })
      )
        throw new Error(`Invalid row format: ${row}`);
      else return card;
    },
  },
});
</script>
