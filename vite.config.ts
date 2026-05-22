// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  vite: {
    plugins: [
      imagetools({
        defaultDirectives: (url) => {
          // Apply defaults only when caller didn't pass any params
          if (url.searchParams.size > 0) return new URLSearchParams();
          return new URLSearchParams({ format: "avif;webp;jpg", as: "picture" });
        },
      }),
    ],
  },
});
