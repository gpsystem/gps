import { join, dirname } from "path";
import * as cssnano from "cssnano";
import * as tailwind from "tailwindcss";
import { sync } from "glob";
import type { AcceptedPlugin } from "postcss";

export default function getPostcssConfig(path: string): AcceptedPlugin[] {
  const contentFiles = sync(join(dirname(path), "*.{js,jsx,ts,tsx}"));

  return [
    tailwind({
      content: contentFiles,
      darkMode: "media",
      theme: {
        extend: {},
      },
    }),
    cssnano(),
  ];
}
