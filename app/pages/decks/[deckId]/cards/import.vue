<template>
  <main v-if="deck">
    <nav class="p-18-0 flex align-i-center gap-6 icon-color-white-two">
      <NuxtLink :to="`/decks/${deck.id}`" class="flex align-i-center">
        <backIcon class="w-24" />
      </NuxtLink>
      <h2 class="m-0 color-green-one" font="w-600">Import Cards</h2>
    </nav>
    <div class="mt-30 flex column gap-20">
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
          class="bg-color-green-two color-indigo-one p-12-24 pointer mt-28"
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
      if (!this.file) return;

      const content = await this.readFile(this.file);
      const data = this.parseCSVContent(content);
      data.shift();

      const cards = data
        .map((row) => this.convertRowToCard(row))
        .filter(Boolean) as Card[];
      await db.cards.bulkAdd(cards);
      navigateTo(`/decks/${this.deck.id}`);
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

    convertRowToCard(row: string[]): Card | null {
      if (row.length !== 6) {
        console.error("Invalid row format:", row);
        return null;
      }

      const [
        question,
        answer,
        familarity,
        lastReviewedAt,
        reverseFamilarity,
        lastReverseReviewedAt,
      ] = row as [string, string, string, string, string, string];
      return {
        question,
        answer,
        familarity: parseInt(familarity || "0"),
        lastReviewedAt: lastReviewedAt
          ? Date.parse(lastReviewedAt)
          : Date.now(),
        reverseFamilarity: parseInt(reverseFamilarity || "0"),
        lastReverseReviewedAt: lastReverseReviewedAt
          ? Date.parse(lastReverseReviewedAt)
          : Date.now(),
        createdAt: Date.now(),
        deckId: this.deck.id,
      } as unknown as Card;
    },
  },
});
</script>
