import type { Rule } from "unocss";

export default [
  [
    /^color-([\w-]+)$/,
    ([, color]: string[]) => {
      return {
        color: `var(--${color})`,
      };
    },
  ],

  [
    /^bg-color-([\w-]+)$/,
    ([, color]: string[]) => {
      return {
        "background-color": `var(--${color})`,
      };
    },
  ],

  [
    /^fill-([\w-]+)$/,
    ([, color]: string[]) => {
      return {
        fill: `var(--${color})`,
      };
    },
  ],

  [
    /^icon-color-([\w-]+)$/,
    ([, color]: string[]) => {
      return {
        "--icon": `var(--${color})`,
      };
    },
  ],

  ["no-bg", { background: "none" }],
] as Rule[];
