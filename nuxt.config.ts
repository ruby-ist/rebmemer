// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  components: [
    {
      path: "~/components/icons",
      pathPrefix: false,
    },
    "~/components",
  ],
  devtools: { enabled: true },
  modules: ["@unocss/nuxt"],
  ssr: false,
});
