import { join, dirname, sep } from "path";
import * as cssnano from "cssnano";
import { sync } from "glob";
import type { AcceptedPlugin } from "postcss";
import * as tailwind from "tailwindcss";

export default function getPostcssConfig(path: string): AcceptedPlugin[] {
  const contentFiles = sync(
    join(dirname(path), "**/*.{js,jsx,ts,tsx}").split(sep).join("/")
  );

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
