// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";

// Opt-in image transforms. Use ?picture import suffix to get
// { sources: { avif, webp }, img: { src, w, h } } shape.
// Example:
//   import hero from "./hero.jpg?picture";
//   <SmartImage picture={hero} sizes="(max-width: 768px) 100vw, 60vw" />
export default defineConfig({
  vite: {
    plugins: [
      imagetools({
        defaultDirectives: (url) => {
          if (url.searchParams.has("picture")) {
            return new URLSearchParams({
              format: "avif;webp;jpg",
              w: "480;960;1440;1920",
              as: "picture",
            });
          }
          return new URLSearchParams();
        },
      }),
    ],
  },
});
