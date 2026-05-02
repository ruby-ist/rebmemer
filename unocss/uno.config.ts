import {
  defineConfig,
  presetWebFonts,
  presetMini,
  presetAttributify,
} from "unocss";
import boxRules from "./box.rules";
import displayRules from "./display.rules";
import positionRules from "./position.rules";
import colorRules from "./color.rules";
import typographyRules from "./typography.rules";
import animationRules from "./animation.rules";
import staticRules from "./static.rules";
import listRules from "./list.rules";
import tableRules from "./table.rules";

export default defineConfig({
  presets: [
    presetMini(),
    presetAttributify(),
    presetWebFonts({
      provider: "google",
      fonts: {
        // sans: ["M PLUS Rounded 1c", "RocknRoll One"],
      },
    }),
  ],
  rules: [
    ...boxRules,
    ...displayRules,
    ...positionRules,
    ...colorRules,
    ...typographyRules,
    ...animationRules,
    ...staticRules,
    ...listRules,
    ...tableRules,
  ],
  variants: [
    (matcher) => {
      if (matcher.startsWith("strict:")) {
        return { matcher: matcher.slice(7) };
      }
    },
  ],
  postprocess: [
    (util) => {
      if (!util.selector.includes(".strict\\:")) return;

      util.entries.forEach(([, val], i) => {
        util.entries[i]![1] = `${val} !important`;
      });
    },
  ],
});
