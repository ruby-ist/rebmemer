import type { ModuleOptions } from "@vite-pwa/nuxt";

const config: Partial<ModuleOptions> = {
  registerType: "autoUpdate",
  workbox: {
    globPatterns: ["**/*.{js,css,html,svg,ttf}"],
  },
  manifest: {
    name: "Rebememer",
    short_name: "Rebememer",
    start_url: "/decks",
    description: "Mobile first offline Spacial Repitation System as PWA",
    theme_color: "#1D528A",
    icons: [
      {
        src: "pwa-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};
export default config;
