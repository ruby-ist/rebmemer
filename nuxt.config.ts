// https://nuxt.com/docs/api/configuration/nuxt-config
import unoConfig from "./unocss/uno.config";
import pwaConfig from "./pwa.config";

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
  modules: ["@unocss/nuxt", "v-gsap-nuxt", "@vite-pwa/nuxt"],
  pwa: pwaConfig,
  ssr: false,
  unocss: unoConfig,
});
