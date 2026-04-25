<template>
  <main>
    <nav class="p-14-20">
      <h1 class="m-0" font="w-800">Decks</h1>
    </nav>
    <div class="p-10-20 flex wrap row gap-20-8p">
      <div class="w-46p flex column gap-10">
        <div class="img1 w-100p h-200 bd-rad-10 relative">
          <div class="absolute b-5p r-10p" font="w-600" style="color: #d9ffff">
            230
          </div>
        </div>
        <div class="flex column gap-4">
          <h3 class="font-w-500 m-0">日本語 words</h3>
          <div class="font-s-0.8rem" style="color: #9dc0e2">
            1 Mar 2026, 11:23
          </div>
        </div>
      </div>
      <div class="w-46p flex column gap-10">
        <div class="img2 w-100p h-200 bd-rad-10 relative">
          <div class="absolute b-5p r-10p" font="w-600" style="color: #d9ffff">
            120
          </div>
        </div>
        <div class="flex column gap-4">
          <h3 class="font-w-500 m-0">Kanji</h3>
          <div class="font-s-0.8rem" style="color: #9dc0e2">
            1 Mar 2026, 11:23
          </div>
        </div>
      </div>
    </div>
    <button>
      <div class="w-40 h-40">+</div>
    </button>
  </main>
</template>

<style scoped>
.img1 {
  background:
    linear-gradient(transparent, #2c6990),
    url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpzOeFqbXC_Jbwq8MHlUsa_eccbSDzcu-Kjg&s");
}

.img2 {
  background:
    linear-gradient(transparent, #2c6990),
    url("https://static.vecteezy.com/system/resources/thumbnails/014/595/637/small/word-japan-in-kanji-letters-icon-outline-style-vector.jpg");
  background-size: contain;
  background-position: center;
}

button {
  background: #74feb2;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  border-radius: 50px;
  font-size: 2rem;
  font-weight: 600;
  padding: 20px;
  height: 80px;
  width: 80px;
}
</style>
